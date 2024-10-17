import ConnectButton from './WalletButton'
import { IndianRupeeIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react'

export default function Navbar() {
    // Mock data for price and movement - replace with actual data in your implementation
    const price = 82.45;
    const priceChange = 1.2; // Percentage change

    return (
        <nav className="bg-gray-100 border-b-4 border-black p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#39FF14]">L</span>
          <h1 className="text-xl font-bold">sign?.state( )</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white px-3 py-2 rounded-md border border-gray-300">
            <IndianRupeeIcon className="w-5 h-5 text-[#39FF14] mr-2" />
            <span className="font-semibold text-base">USDT/INR: <span className="text-[#39FF14]">{price.toFixed(2)}</span></span>
            <div className={`ml-2 flex items-center ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange >= 0 ? <TrendingUpIcon className="w-4 h-4 mr-1" /> : <TrendingDownIcon className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{Math.abs(priceChange).toFixed(1)}%</span>
            </div>
          </div>
         <ConnectButton />
        </div>
      </nav>
    )
}
