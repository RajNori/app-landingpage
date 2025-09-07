'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaTimes, 
    FaCheck, 
    FaClock, 
    FaBoxes,
    FaCartPlus 
} from 'react-icons/fa';
import { ServicePackage } from '../../lib/catalog';
import { formatAud } from '../../lib/pricing';
import { useCart } from '../../contexts/CartContext';

interface CompareModalProps {
    isOpen: boolean;
    onClose: () => void;
    packages: ServicePackage[];
    onRemovePackage: (packageId: string) => void;
}

export default function CompareModal({ 
    isOpen, 
    onClose, 
    packages, 
    onRemovePackage 
}: CompareModalProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (pkg: ServicePackage) => {
        addToCart(pkg.id, pkg.recommendedQty);
    };

    const getAllFeatures = () => {
        const allFeatures = new Set<string>();
        packages.forEach(pkg => {
            pkg.features.forEach(feature => allFeatures.add(feature));
        });
        return Array.from(allFeatures);
    };

    const getAllAddons = () => {
        const allAddons = new Map<string, NonNullable<ServicePackage['addons']>[0]>();
        packages.forEach(pkg => {
            pkg.addons?.forEach(addon => {
                if (!allAddons.has(addon.id)) {
                    allAddons.set(addon.id, addon);
                }
            });
        });
        return Array.from(allAddons.values());
    };

    const hasFeature = (pkg: ServicePackage, feature: string) => {
        return pkg.features.includes(feature);
    };

    const hasAddon = (pkg: ServicePackage, addonId: string) => {
        return pkg.addons?.some(addon => addon.id === addonId);
    };

    const getAddonPrice = (pkg: ServicePackage, addonId: string) => {
        return pkg.addons?.find(addon => addon.id === addonId)?.priceCents;
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={onClose}>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
                    onClick={e => e.stopPropagation()}>
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#511076] to-[#6b2a8f] text-white p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Compare Services</h2>
                                <p className="text-purple-100">
                                    Compare {packages.length} service{packages.length !== 1 ? 's' : ''} side-by-side
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <FaTimes className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="overflow-auto max-h-[calc(90vh-120px)]">
                        <div className={`grid grid-cols-1 ${packages.length === 2 ? 'md:grid-cols-2' : packages.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3'} gap-0`}>
                            
                            {packages.map((pkg, index) => (
                                <div 
                                    key={pkg.id} 
                                    className={`p-6 ${index < packages.length - 1 ? 'border-r border-gray-200' : ''}`}>
                                    
                                    {/* Package Header */}
                                    <div className="text-center mb-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-gray-900 text-left">
                                                {pkg.name}
                                            </h3>
                                            <button
                                                onClick={() => onRemovePackage(pkg.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors">
                                                <FaTimes className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                                        
                                        {/* Price */}
                                        <div className="bg-purple-50 rounded-lg p-4 mb-4">
                                            <div className="text-3xl font-bold text-[#511076]">
                                                {formatAud(pkg.basePriceCents)}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                per {pkg.unitLabel}
                                            </div>
                                            {pkg.minQty > 1 && (
                                                <div className="text-xs text-purple-600 mt-1">
                                                    Minimum: {pkg.minQty} {pkg.unitLabel}
                                                    {pkg.minQty > 1 ? 's' : ''}
                                                </div>
                                            )}
                                        </div>

                                        {/* Quick Info */}
                                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                                            {pkg.estimatedDuration && (
                                                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                                                    <FaClock className="text-blue-500" />
                                                    <span className="text-gray-700">{pkg.estimatedDuration}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                                                <FaBoxes className="text-green-500" />
                                                <span className="text-gray-700">
                                                    {pkg.minQty}-{pkg.maxQty} {pkg.unitLabel}
                                                    {pkg.maxQty > 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={() => handleAddToCart(pkg)}
                                            className="w-full bg-[#511076] hover:bg-[#6b2a8f] text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                                            <FaCartPlus />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Features Comparison */}
                        <div className="border-t border-gray-200">
                            <div className="p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                    Features Comparison
                                </h4>
                                
                                <div className="space-y-3">
                                    {getAllFeatures().map((feature, featureIndex) => (
                                        <div 
                                            key={featureIndex}
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0">
                                            
                                            <div className="font-medium text-gray-700 lg:col-span-1">
                                                {feature}
                                            </div>
                                            
                                            <div className={`grid ${packages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-4 lg:col-span-2`}>
                                                {packages.map((pkg) => (
                                                    <div key={`${pkg.id}-${featureIndex}`} className="text-center">
                                                        {hasFeature(pkg, feature) ? (
                                                            <FaCheck className="w-5 h-5 text-green-500 mx-auto" />
                                                        ) : (
                                                            <div className="w-5 h-5 bg-gray-200 rounded-full mx-auto" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Addons Comparison */}
                        {getAllAddons().length > 0 && (
                            <div className="border-t border-gray-200">
                                <div className="p-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                        Available Add-ons
                                    </h4>
                                    
                                    <div className="space-y-3">
                                        {getAllAddons().map((addon, addonIndex) => (
                                            <div 
                                                key={addonIndex}
                                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0">
                                                
                                                <div className="lg:col-span-1">
                                                    <div className="font-medium text-gray-700">{addon.name}</div>
                                                    {addon.description && (
                                                        <div className="text-sm text-gray-500 mt-1">
                                                            {addon.description}
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className={`grid ${packages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-4 lg:col-span-2`}>
                                                    {packages.map((pkg) => (
                                                        <div key={`${pkg.id}-addon-${addonIndex}`} className="text-center">
                                                            {hasAddon(pkg, addon.id) ? (
                                                                <div className="text-sm">
                                                                    <FaCheck className="w-4 h-4 text-green-500 mx-auto mb-1" />
                                                                    <div className="font-semibold text-[#511076]">
                                                                        {formatAud(getAddonPrice(pkg, addon.id) || 0)}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-gray-400 text-sm">
                                                                    Not available
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
