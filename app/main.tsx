'use client'
// pages/index.js
import { useState } from 'react';
import Head from 'next/head';

export default function Main() {
  // State to track selected community
  const [selectedCommunity, setSelectedCommunity] = useState('P2P Traders');

  // Communities and example posts data
  const communities = ['P2P Traders', 'Lawyers & Contracts', 'Service Exchange'];
  const posts = {
    'P2P Traders': [
      { title: 'Looking to Sell 1 BTC', details: 'Rate: ₹25,00,000', user: '@cryptoDude', action: 'Buy Now' },
      { title: 'Buying ETH for INR', details: 'Need 2 ETH', user: '@blockchainWhiz', action: 'Sell Now' }
    ],
    'Lawyers & Contracts': [
      { title: 'Looking for rental agreement assistance', details: 'Mumbai region', user: '@legalEagle', action: 'Contact' },
      { title: 'Need a lawyer for business contract', details: 'Start-up contract', user: '@startUpLawyer', action: 'Draft Contract' }
    ],
    'Service Exchange': [
      { title: 'Offering graphic design services for crypto', details: 'Portfolio available', user: '@designGuru', action: 'Hire Me' },
      { title: 'Need a developer for smart contract audit', details: 'ERC-20 contract', user: '@auditExpert', action: 'Apply' }
    ]
  };

  return (
    <>
      <Head>
        <title>Trustless P2P Platform - Communities</title>
      </Head>

      {/* Top Navigation Bar */}
      <nav className="bg-gray-800 p-4 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Trustless P2P Platform</div>
          <div className="space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Profile</a>
            <a href="#" className="hover:underline">Settings</a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex max-w-7xl mx-auto py-8 px-4 lg:px-8 space-x-8">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Communities</h2>
          <ul className="space-y-2">
            {communities.map((community) => (
              <li
                key={community}
                className={`p-2 rounded-lg cursor-pointer ${
                  selectedCommunity === community
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedCommunity(community)}
              >
                {community}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-3/4">
          <section className="mb-6">
            <h1 className="text-3xl font-bold mb-4">{selectedCommunity}</h1>
            <p className="text-gray-600">
              {selectedCommunity === 'P2P Traders'
                ? 'Join P2P traders for cryptocurrency exchanges.'
                : selectedCommunity === 'Lawyers & Contracts'
                ? 'Collaborate with lawyers for legal contracts.'
                : 'Exchange services in the community.'}
            </p>
          </section>

          {/* Create Post Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Create a Post</h2>
            <textarea
              className="w-full border border-gray-300 p-4 rounded-lg mb-4 focus:ring focus:ring-blue-500"
              placeholder={`What's on your mind in ${selectedCommunity}?`}
              rows="4"
            ></textarea>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition">
              Post
            </button>
          </section>

          {/* Posts Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Latest Posts in {selectedCommunity}</h2>
            <div className="space-y-6">
              {posts[selectedCommunity].map((post, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-6 rounded-lg shadow hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-2">{post.details}</p>
                  <p className="text-gray-500 mb-4">Posted by: {post.user}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition">
                    {post.action}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
