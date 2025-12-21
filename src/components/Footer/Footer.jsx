const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">
            📚 BookCourier
          </h2>
          <p className="text-sm leading-relaxed">
            BookCourier is an online book management and delivery platform where
            users can explore, order, and receive books easily and securely.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/all-books" className="hover:text-blue-400">All Books</a></li>
            <li><a href="/login" className="hover:text-blue-400">Login</a></li>
            <li><a href="/register" className="hover:text-blue-400">Register</a></li>
          </ul>
        </div>

        {/* Dashboard Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Dashboard
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/dashboard/profile" className="hover:text-blue-400">My Profile</a></li>
            <li><a href="/dashboard/orders" className="hover:text-blue-400">My Orders</a></li>
            <li><a href="/dashboard/invoices" className="hover:text-blue-400">Invoices</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@bookcourier.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} BookCourier. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
