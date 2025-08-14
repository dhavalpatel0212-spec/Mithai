
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight?: string;
  extraDryFruits: 'none' | 'minimum' | 'plus' | 'extra';
  customNote: string;
}

export interface OrderDetails {
  items: OrderItem[];
  total: number;
  customerEmail: string;
  orderId: string;
}

export class EmailService {
  private static generateOrderId(): string {
    return `TRS${Date.now().toString().slice(-6)}`;
  }

  private static formatOrderItems(items: OrderItem[]): string {
    return items.map(item => {
      const dryFruitsText = item.extraDryFruits !== 'none' ? ` (${item.extraDryFruits} dry fruits)` : '';
      const noteText = item.customNote ? ` - Note: ${item.customNote}` : '';
      return `• ${item.name} (${item.weight || 'Standard'}) x${item.quantity}${dryFruitsText}${noteText} - £${(item.price * item.quantity).toFixed(2)}`;
    }).join('\n');
  }

  public static async sendOrderConfirmation(orderDetails: OrderDetails): Promise<boolean> {
    try {
      const emailContent = this.generateEmailContent(orderDetails);
      
      // In a real application, you would integrate with an email service like:
      // - SendGrid
      // - Mailgun
      // - AWS SES
      // - Nodemailer with SMTP
      
      // For demonstration, we'll log the email and simulate sending
      console.log('📧 Sending Order Confirmation Email:');
      console.log(emailContent);
      
      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success (in real app, this would be the actual email service response)
      return true;
      
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      return false;
    }
  }

  private static generateEmailContent(orderDetails: OrderDetails): string {
    const { items, total, customerEmail, orderId } = orderDetails;
    
    return `
=== ORDER CONFIRMATION EMAIL ===
To: ${customerEmail}
Subject: Order Confirmation #${orderId} - Traditional Royal Sweets

Dear Valued Customer,

Thank you for choosing Traditional Royal Sweets! We're delighted to confirm your order.

🛒 ORDER DETAILS:
Order ID: #${orderId}
Date: ${new Date().toLocaleDateString('en-GB')}

📦 ITEMS ORDERED:
${this.formatOrderItems(items)}

💰 PAYMENT SUMMARY:
Subtotal: £${total.toFixed(2)}
Delivery: FREE (UK-wide)
────────────────────
TOTAL PAID: £${total.toFixed(2)}

🚚 DELIVERY INFORMATION:
• Free delivery across the UK
• Estimated delivery: 1-2 business days
• Your sweets will be freshly prepared
• Tracking information will be sent separately

📞 NEED HELP?
If you have any questions about your order, please don't hesitate to contact us.

Thank you for trusting us with your sweet cravings!

With love and sweetness,
Traditional Royal Sweets Team

---
This email was sent to ${customerEmail}
Order placed on ${new Date().toISOString()}
    `;
  }

  public static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
