import PropTypes from 'prop-types';
import { Zap, Wallet, Users, ArrowDownLeft, Shield } from 'lucide-react';

const Button = ({ children, primary }) => (
  <button className={`px-4 py-2 rounded-md ${primary ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool
};

const Feature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-4 text-center">
    <Icon className="w-8 h-8 mb-2 text-blue-500" />
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

Feature.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <Zap className="w-6 h-6 text-blue-500" />
          <span className="ml-2 text-xl font-bold">FlashPay</span>
        </div>
        <nav>
          <a href="#" className="mx-2 text-sm">Features</a>
          <a href="#" className="mx-2 text-sm">Pricing</a>
          <a href="#" className="mx-2 text-sm">About</a>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to FlashPay</h1>
          <p className="mb-8 text-xl text-gray-600">Fast, secure, and easy payments for everyone.</p>
          <div className="space-x-4">
            <Button primary>Get Started</Button>
            <Button>Learn More</Button>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <Feature 
              icon={Wallet} 
              title="Check Balance" 
              description="View your account balance anytime, anywhere."
            />
            <Feature 
              icon={Users} 
              title="See All Users" 
              description="Connect with other FlashPay users easily."
            />
            <Feature 
              icon={ArrowDownLeft} 
              title="Receive Money" 
              description="Get paid instantly from anyone, anywhere."
            />
            <Feature 
              icon={Shield} 
              title="OTP Verification" 
              description="Secure signup process with OTP verification."
            />
          </div>
        </section>

        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8 text-xl text-gray-600">Join thousands of happy users today!</p>
          <form className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-2 rounded-l-md border-t border-b border-l"
            />
            <Button primary>Sign Up</Button>
          </form>
        </section>
      </main>

      <footer className="border-t p-4 text-center text-sm text-gray-600">
        © 2024 FlashPay. All rights reserved.
      </footer>
    </div>
  );
}