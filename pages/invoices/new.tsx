import  { InvoiceForm } from '../../src/invoices/InvoiceForm'

export default function NewInvoicePage () {
    return (
        <InvoiceForm
            onInvoiceSubmitRequest={(values) => {
                console.log("onInvoiceSubmitRequest", values)
            }}
        />
    )
}
