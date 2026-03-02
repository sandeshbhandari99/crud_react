import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Send, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InvoiceForm = ({ onChange }) => {
    const [invoice, setInvoice] = useState({
        clientName: '',
        clientPhone: '',
        invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString().split('T')[0],
        items: [{ id: 1, description: 'Service Description', quantity: 1, price: 100 }],
        currency: 'Rs.',
        taxRate: 13,
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
                return { ...item, [field]: field === 'description' ? value : Number(value) };
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
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ margin: 0 }}>Client Information</h2>
                <span style={{ fontSize: '0.85rem', background: '#e0f2fe', color: '#0ea5e9', padding: '4px 12px', borderRadius: '20px', fontWeight: '600' }}>
                    {invoice.invoiceNumber}
                </span>
            </div>

            <div className="input-group">
                <label>Client Name</label>
                <input type="text" name="clientName" placeholder="Full Name" value={invoice.clientName} onChange={handleChange} />
            </div>

            <div className="input-group">
                <label>Phone Number</label>
                <input type="text" name="clientPhone" placeholder="+977 98XXXXXXX" value={invoice.clientPhone} onChange={handleChange} />
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
                            <input type="text" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Qty</label>
                            <input type="number" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Price</label>
                            <input type="number" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Total</label>
                            <input type="text" value={`${invoice.currency}${(item.quantity * item.price).toFixed(2)}`} disabled />
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

            <div className="grid" style={{ marginTop: '30px', gridTemplateColumns: '1fr 1fr' }}>
                <div className="input-group">
                    <label>Tax Rate (%)</label>
                    <input type="number" name="taxRate" value={invoice.taxRate} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label>Currency Symbol</label>
                    <input type="text" name="currency" value={invoice.currency} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default InvoiceForm;
