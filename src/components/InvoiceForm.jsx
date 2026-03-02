import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Send, Download, User, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InvoiceForm = ({ onChange }) => {
    const [invoice, setInvoice] = useState({
        clientName: '',
        clientPhone: '',
        clientAddress: '',
        invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [{ id: 1, description: '', quantity: '', price: '' }],
        currency: 'Rs.',
        taxRate: 13,
        discountRate: 0,
    });

    useEffect(() => {
        onChange(invoice);
    }, [invoice]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoice(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (id, field, value) => {
        const newItems = invoice.items.map(item => {
            if (item.id === id) {
                // Keep raw string for display; numeric fields stored as string (coerced in preview)
                return { ...item, [field]: value };
            }
            return item;
        });
        setInvoice(prev => ({ ...prev, items: newItems }));
    };

    const addItem = () => {
        setInvoice(prev => ({
            ...prev,
            items: [...prev.items, { id: Date.now(), description: '', quantity: 1, price: 0 }]
        }));
    };

    const removeItem = (id) => {
        setInvoice(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    return (
        <div className="card card-special">
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ margin: 0 }}>Client Information</h2>
            </div>

            <div className="client-info-grid">
                <div className="info-card">
                    <div className="info-icon"><User size={20} /></div>
                    <div className="info-content">
                        <label>Client Name</label>
                        <input
                            type="text"
                            name="clientName"
                            placeholder="Full Name"
                            value={invoice.clientName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="info-card">
                    <div className="info-icon"><Phone size={20} /></div>
                    <div className="info-content">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="clientPhone"
                            placeholder="+977 98XXXXXXX"
                            value={invoice.clientPhone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="info-card">
                    <div className="info-icon"><MapPin size={20} /></div>
                    <div className="info-content">
                        <label>Address</label>
                        <input
                            type="text"
                            name="clientAddress"
                            placeholder="Street, City, Country"
                            value={invoice.clientAddress}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <h3 style={{ margin: '30px 0 15px' }}>Line Items</h3>
            <AnimatePresence>
                {invoice.items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="item-row"
                    >
                        <div className="input-group">
                            <label>Description</label>
                            <input type="text" value={item.description} placeholder="e.g. Web Design, Repair Service..." onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Qty</label>
                            <input type="number" value={item.quantity} placeholder="0" onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Price</label>
                            <input type="number" value={item.price} placeholder="0.00" onChange={(e) => handleItemChange(item.id, 'price', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Total</label>
                            <input type="text" value={((Number(item.quantity) || 0) * (Number(item.price) || 0)).toFixed(2)} disabled />
                        </div>
                        <button className="btn" style={{ padding: '8px', color: '#ef4444', background: '#fef2f2' }} onClick={() => removeItem(item.id)}>
                            <Trash2 size={18} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
            <button className="btn btn-add" onClick={addItem}>
                <Plus size={18} /> Add Item
            </button>

            <div className="grid" style={{ marginTop: '30px' }}>
                <div className="input-group">
                    <label>Tax Rate (%)</label>
                    <input type="number" name="taxRate" value={invoice.taxRate} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label>Discount (%)</label>
                    <input type="number" name="discountRate" value={invoice.discountRate} min="0" max="100" onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default InvoiceForm;
