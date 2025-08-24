# Google Apps Script Setup Guide for Helpi Landing Page

## 🚀 Overview
This guide will help you set up a Google Apps Script to handle contact form submissions from your Helpi landing page. The script will:
- Receive form submissions via HTTP POST
- Save data to a Google Spreadsheet
- Send email notifications
- Validate form data
- Provide JSON responses

## 📋 Prerequisites
- Google account with access to Google Drive and Google Apps Script
- Basic understanding of Google Sheets
- Your Helpi landing page contact form

## 🛠️ Step-by-Step Setup

### 1. Create the Google Spreadsheet
1. Go to [Google Drive](https://drive.google.com)
2. Click "New" → "Google Sheets"
3. Name it exactly: **"Helpi landing"**
4. Rename the first sheet to **"contact"**
5. Share the spreadsheet with your Google account (if needed)

### 2. Create Google Apps Script Project
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Rename the project to "Helpi Contact Form Handler"
4. Delete the default `myFunction` code
5. Copy and paste the entire code from `google-apps-script.js`
6. Save the project (Ctrl+S or Cmd+S)

### 3. Configure the Script
1. In the script editor, find the `CONFIG` section at the top
2. Update the `ADMIN_EMAIL` to your email address:
   ```javascript
   ADMIN_EMAIL: 'your-email@gmail.com', // Update this
   ```
3. Save the project again

### 4. Set Up the Spreadsheet Structure
1. In the Apps Script editor, select the `setupSpreadsheet` function from the dropdown
2. Click the "Run" button (▶️)
3. Grant necessary permissions when prompted
4. Check the execution log to confirm setup success

### 5. Test the Setup
1. In the Apps Script editor, select the `testSetup` function
2. Click "Run" to test the connection
3. Check the execution log for success messages

### 6. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following options:
   - **Execute as**: "Me" (your account)
   - **Who has access**: "Anyone" (for public form access)
4. Click "Deploy"
5. Copy the **Web app URL** - you'll need this for the form

### 7. Update Your Contact Form
1. Open your contact page: `src/app/contact/page.tsx`
2. Update the form to submit to the Google Apps Script URL
3. Add form handling logic

## 🔧 Form Integration

### Option 1: Direct Form Submission (Recommended)
Update your contact form to submit directly to the Google Apps Script:

```tsx
<form 
  action="YOUR_GOOGLE_APPS_SCRIPT_URL" 
  method="POST" 
  className="space-y-6"
>
  {/* Your existing form fields */}
</form>
```

### Option 2: JavaScript Fetch API
For more control, use JavaScript to submit the form:

```tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Show success message
      alert('Form submitted successfully!');
    } else {
      // Show error message
      alert('Error: ' + result.error.message);
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('Failed to submit form. Please try again.');
  }
};
```

## 📊 Spreadsheet Structure

The script will automatically create this structure in your "contact" sheet:

| Column | Header | Description |
|--------|--------|-------------|
| A | Timestamp | When the form was submitted |
| B | First Name | Customer's first name |
| C | Last Name | Customer's last name |
| D | Email | Customer's email address |
| E | Subject | Form subject line |
| F | Message | Customer's message |
| G | Source | Always "Helpi Landing Page" |
| H | Status | Always "New" initially |

## 📧 Email Notifications

The script will automatically send email notifications to your admin email when forms are submitted. Each email includes:
- Customer's contact information
- Form subject and message
- Submission timestamp
- Professional HTML formatting

## 🧪 Testing

### Test the Web App Endpoint
1. Use a tool like [Postman](https://www.postman.com) or [curl](https://curl.se)
2. Send a POST request to your web app URL
3. Include form data in the request body
4. Verify you get a success response

### Test Form Submission
1. Fill out your contact form on the website
2. Submit the form
3. Check your Google Spreadsheet for new entries
4. Check your email for notifications

## 🔒 Security Considerations

- **Rate Limiting**: Google Apps Script has built-in rate limits
- **Input Validation**: The script validates all form inputs
- **Email Verification**: Only sends notifications to configured admin email
- **Access Control**: Web app is public but only accepts POST requests

## 🚨 Troubleshooting

### Common Issues

1. **"Spreadsheet not found"**
   - Ensure the spreadsheet is named exactly "Helpi landing"
   - Check that you have access to the spreadsheet

2. **"Sheet not found"**
   - Ensure the sheet is named exactly "contact"
   - Run the `setupSpreadsheet` function

3. **Form submissions not working**
   - Check the web app URL is correct
   - Verify the web app is deployed and accessible
   - Check the Apps Script execution logs

4. **Email notifications not sending**
   - Verify your email address in the CONFIG
   - Check Apps Script execution logs for email errors
   - Ensure you haven't exceeded daily email limits

### Debug Steps

1. **Check Execution Logs**
   - In Apps Script, click "Executions" to see recent runs
   - Look for error messages or success confirmations

2. **Test Individual Functions**
   - Run `testSetup` to verify spreadsheet connection
   - Run `setupSpreadsheet` to recreate the structure

3. **Check Permissions**
   - Ensure the script has access to Google Sheets
   - Verify the web app deployment permissions

## 📈 Monitoring and Maintenance

### Regular Checks
- Monitor form submissions in your spreadsheet
- Check email notifications are working
- Review Apps Script execution logs monthly

### Updates
- The script automatically handles new submissions
- No manual maintenance required
- Consider backing up your spreadsheet data periodically

## 🎯 Next Steps

After setup:
1. Test the complete flow end-to-end
2. Customize the email template if needed
3. Add any additional validation rules
4. Consider adding analytics or reporting features

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Apps Script execution logs
3. Verify all setup steps were completed
4. Test with a simple form submission first

---

**Note**: This setup creates a production-ready contact form handler. The script includes error handling, validation, and logging to ensure reliable operation.
