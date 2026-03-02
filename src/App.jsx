import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { Receipt, ShieldCheck, Zap } from 'lucide-react';
import './styles.css';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  return (
    <div className="container">
      <header className="header">
        <div className="header-decoration">BILLING</div>
        <div className="title-container">
          <h1>
            Everest <span className="accent-text">Billing</span>
          </h1>
        </div>
      </header>

      <main className="grid">
        <InvoiceForm onChange={setInvoiceData} />
        <InvoicePreview data={invoiceData} />
      </main>

      <footer style={{ marginTop: '80px', borderTop: '1px solid #e2e8f0', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8' }}>
        <p>© 2026 Everest Billing System. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><ShieldCheck size={16} /> SSL Encrypted</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Zap size={16} /> Fast Generation</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
