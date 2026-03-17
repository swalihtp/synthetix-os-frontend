export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 px-6 border-t border-gray-800">

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-white text-xl font-bold">Synthetix OS</h3>
          <p className="mt-3 text-sm">
            Build AI agents that automate your workflows and scale your business.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-white font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li>Features</li>
            <li>Pricing</li>
            <li>Integrations</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

      </div>

      <div className="text-center mt-10 text-sm">
        © {new Date().getFullYear()} Synthetix OS. All rights reserved.
      </div>

    </footer>
  );
}