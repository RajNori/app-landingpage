/**
 * Helpi Landing Page - Contact Form Handler
 * Google Apps Script for processing contact form submissions
 *
 * Setup Instructions:
 * 1. Create a new Google Apps Script project
 * 2. Copy this code into the editor
 * 3. Create a spreadsheet called "Helpi landing" with a sheet called "contact"
 * 4. Deploy as a web app
 * 5. Update the form action URL in your contact page
 */

// Configuration
const CONFIG = {
    SPREADSHEET_NAME: 'Helpi landing',
    SHEET_NAME: 'contact',
    ADMIN_EMAIL: 'support@gethelpi.com', // Update with your email
    EMAIL_SUBJECT: 'New Contact Form Submission - Helpi Landing Page',
    LOG_SUBMISSIONS: true,
};

/**
 * Handle GET requests (for testing and health checks)
 * This function is required for Google Apps Script web app deployment
 */
function doGet(e) {
    try {
        return ContentService.createTextOutput(
            JSON.stringify({
                success: true,
                message: 'Helpi Contact Form Handler is working!',
                timestamp: new Date().toISOString(),
                status: 'ready',
                endpoints: {
                    post: 'POST / - Submit contact form',
                    get: 'GET / - Health check (this endpoint)',
                },
            })
        ).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService.createTextOutput(
            JSON.stringify({
                success: false,
                error: 'Health check failed',
                message: error.toString(),
                timestamp: new Date().toISOString(),
            })
        ).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Main function to handle form submissions
 * This is the web app endpoint that receives POST requests
 */
function doPost(e) {
    try {
        console.log('POST request received');
        console.log('Request parameters:', e.parameter);
        console.log(
            'Post data type:',
            e.postData ? e.postData.type : 'No postData'
        );
        console.log(
            'Post data contents:',
            e.postData ? e.postData.contents : 'No postData'
        );
        console.log(
            'Request method:',
            e.parameter ? 'Form data via e.parameter' : 'JSON via e.postData'
        );

        // Parse the incoming data
        const formData = parseFormData(e);

        // Validate the data
        const validationResult = validateFormData(formData);
        if (!validationResult.isValid) {
            return createErrorResponse(
                400,
                'Validation Error',
                validationResult.errors
            );
        }

        // Log the submission
        if (CONFIG.LOG_SUBMISSIONS) {
            console.log(
                'Form submission received:',
                JSON.stringify(formData, null, 2)
            );
        }

        // Save to spreadsheet
        const saveResult = saveToSpreadsheet(formData);
        if (!saveResult.success) {
            return createErrorResponse(500, 'Database Error', saveResult.error);
        }

        // Send email notification
        const emailResult = sendEmailNotification(formData);
        if (!emailResult.success) {
            console.error('Email notification failed:', emailResult.error);
        }

        // Return success response
        return createSuccessResponse(
            "Form submitted successfully! We'll get back to you soon."
        );
    } catch (error) {
        console.error('Error processing form submission:', error);
        return createErrorResponse(
            500,
            'Internal Server Error',
            error.toString()
        );
    }
}

/**
 * Parse form data from the POST request
 */
function parseFormData(e) {
    try {
        // Handle different content types
        if (e.postData.type === 'application/json') {
            return JSON.parse(e.postData.contents);
        } else if (e.postData.type === 'application/x-www-form-urlencoded') {
            const params = e.parameter;
            return {
                firstName: params.firstName || '',
                lastName: params.lastName || '',
                email: params.email || '',
                subject: params.subject || '',
                message: params.message || '',
                timestamp: new Date().toISOString(),
                source: 'Helpi Landing Page',
            };
        } else if (e.postData.type === 'application/json') {
            const jsonData = JSON.parse(e.postData.contents);
            return {
                firstName: jsonData.firstName || '',
                lastName: jsonData.lastName || '',
                email: jsonData.email || '',
                subject: jsonData.subject || '',
                message: jsonData.message || '',
                timestamp: new Date().toISOString(),
                source: 'Helpi Landing Page',
            };
        } else {
            throw new Error('Unsupported content type: ' + e.postData.type);
        }
    } catch (error) {
        throw new Error('Failed to parse form data: ' + error.message);
    }
}

/**
 * Validate form data
 */
function validateFormData(data) {
    const errors = [];

    // Required fields
    if (!data.firstName || data.firstName.trim().length === 0) {
        errors.push('First name is required');
    }

    if (!data.lastName || data.lastName.trim().length === 0) {
        errors.push('Last name is required');
    }

    if (!data.email || data.email.trim().length === 0) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Invalid email format');
    }

    if (!data.subject || data.subject.trim().length === 0) {
        errors.push('Subject is required');
    }

    if (!data.message || data.message.trim().length === 0) {
        errors.push('Message is required');
    }

    // Length validations
    if (data.firstName && data.firstName.trim().length > 50) {
        errors.push('First name must be less than 50 characters');
    }

    if (data.lastName && data.lastName.trim().length > 50) {
        errors.push('Last name must be less than 50 characters');
    }

    if (data.message && data.message.trim().length > 1000) {
        errors.push('Message must be less than 1000 characters');
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
    };
}

/**
 * Check if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Save form data to Google Spreadsheet
 */
function saveToSpreadsheet(data) {
    try {
        // Find the spreadsheet by name
        const spreadsheets = DriveApp.getFilesByName(CONFIG.SPREADSHEET_NAME);
        if (!spreadsheets.hasNext()) {
            throw new Error(
                `Spreadsheet "${CONFIG.SPREADSHEET_NAME}" not found`
            );
        }
        const spreadsheet = SpreadsheetApp.openById(
            spreadsheets.next().getId()
        );

        // Get the contact sheet
        const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
        if (!sheet) {
            throw new Error(
                `Sheet "${CONFIG.SHEET_NAME}" not found in spreadsheet`
            );
        }

        // Prepare data row
        const rowData = [
            new Date(), // Timestamp
            data.firstName.trim(),
            data.lastName.trim(),
            data.email.trim(),
            data.subject.trim(),
            data.message.trim(),
            data.source || 'Helpi Landing Page',
            'New', // Status
        ];

        // Add headers if sheet is empty
        if (sheet.getLastRow() === 0) {
            const headers = [
                'Timestamp',
                'First Name',
                'Last Name',
                'Email',
                'Subject',
                'Message',
                'Source',
                'Status',
            ];
            sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
            sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
            sheet.getRange(1, 1, 1, headers.length).setBackground('#511076');
        }

        // Append the data
        const nextRow = sheet.getLastRow() + 1;
        sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);

        // Auto-resize columns
        sheet.autoResizeColumns(1, rowData.length);

        return { success: true, rowNumber: nextRow };
    } catch (error) {
        console.error('Error saving to spreadsheet:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Send email notification to admin
 */
function sendEmailNotification(data) {
    try {
        const emailBody = createEmailBody(data);

        MailApp.sendEmail({
            to: CONFIG.ADMIN_EMAIL,
            subject: CONFIG.EMAIL_SUBJECT,
            htmlBody: emailBody,
            noReply: true,
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending email notification:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Create HTML email body
 */
function createEmailBody(data) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #511076;">New Contact Form Submission</h2>
      <p>A new contact form has been submitted from the Helpi landing page.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f9fafb;">
          <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${
              data.firstName
          } ${data.lastName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${
              data.email
          }</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Subject:</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${
              data.subject
          }</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Message:</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${
              data.message
          }</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Timestamp:</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${new Date().toLocaleString()}</td>
        </tr>
      </table>
      
      <p style="color: #6b7280; font-size: 14px;">
        This email was automatically generated by the Helpi landing page contact form.
      </p>
    </div>
  `;
}

/**
 * Create success response
 */
function createSuccessResponse(message) {
    return ContentService.createTextOutput(
        JSON.stringify({
            success: true,
            message: message,
            timestamp: new Date().toISOString(),
        })
    ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create error response
 */
function createErrorResponse(statusCode, message, details) {
    return ContentService.createTextOutput(
        JSON.stringify({
            success: false,
            error: {
                code: statusCode,
                message: message,
                details: details,
            },
            timestamp: new Date().toISOString(),
        })
    ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify spreadsheet connection
 * Run this manually to test if everything is set up correctly
 */
function testSetup() {
    try {
        console.log('Testing Helpi landing page setup...');

        // Test spreadsheet connection
        const spreadsheets = DriveApp.getFilesByName(CONFIG.SPREADSHEET_NAME);
        if (spreadsheets.hasNext()) {
            const spreadsheet = SpreadsheetApp.openById(
                spreadsheets.next().getId()
            );
            console.log('✅ Spreadsheet found:', spreadsheet.getName());

            const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
            if (sheet) {
                console.log('✅ Contact sheet found:', sheet.getName());
                console.log('Sheet has', sheet.getLastRow(), 'rows');
            } else {
                console.log('❌ Contact sheet not found');
            }
        } else {
            console.log('❌ Spreadsheet not found');
        }

        // Test email
        console.log('Admin email configured:', CONFIG.ADMIN_EMAIL);
    } catch (error) {
        console.error('Setup test failed:', error);
    }
}

/**
 * Setup function to create the initial spreadsheet structure
 * Run this once to set up your spreadsheet
 */
function setupSpreadsheet() {
    try {
        // Create new spreadsheet if it doesn't exist
        let spreadsheet;
        try {
            const spreadsheets = DriveApp.getFilesByName(
                CONFIG.SPREADSHEET_NAME
            );
            if (spreadsheets.hasNext()) {
                spreadsheet = SpreadsheetApp.openById(
                    spreadsheets.next().getId()
                );
            } else {
                spreadsheet = SpreadsheetApp.create(CONFIG.SPREADSHEET_NAME);
                console.log(
                    'Created new spreadsheet:',
                    CONFIG.SPREADSHEET_NAME
                );
            }
        } catch (e) {
            spreadsheet = SpreadsheetApp.create(CONFIG.SPREADSHEET_NAME);
            console.log('Created new spreadsheet:', CONFIG.SPREADSHEET_NAME);
        }

        // Create contact sheet if it doesn't exist
        let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
        if (!sheet) {
            sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
            console.log('Created new sheet:', CONFIG.SHEET_NAME);
        }

        // Set up headers
        const headers = [
            'Timestamp',
            'First Name',
            'Last Name',
            'Email',
            'Subject',
            'Message',
            'Source',
            'Status',
        ];

        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
        sheet.getRange(1, 1, 1, headers.length).setBackground('#511076');
        sheet.getRange(1, 1, 1, headers.length).setFontColor('white');

        // Auto-resize columns
        sheet.autoResizeColumns(1, headers.length);

        console.log('✅ Spreadsheet setup complete!');
    } catch (error) {
        console.error('Setup failed:', error);
    }
}
