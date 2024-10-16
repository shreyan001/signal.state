'use client'
import React, { useState } from 'react'
import {  Medal, CheckCircle, Briefcase, ChevronRight, Mail, MapPin, Link as LinkIcon } from 'lucide-react'
import Image from 'next/image'

export default function Component() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    username: 'johndoe.eth',
    bio: 'Web3 enthusiast and developer',
    email: 'john@example.com',
    location: 'San Francisco, CA',
    website: 'https://johndoe.eth',
    profileImage: '/placeholder.svg?height=150&width=150',
    onchainScore: 85, // Score out of 100
  })

  const badges = [
    { name: 'Onchain Score', icon: <Medal className="w-4 h-4" />, color: 'bg-yellow-400', value: `${userInfo.onchainScore}/100` },
    { name: 'Coinbase KYC', icon: <CheckCircle className="w-4 h-4" />, color: 'bg-[#0052FF]', textColor: 'text-white' }, // Coinbase blue
    { name: 'Work Verified', icon: <Briefcase className="w-4 h-4" />, color: 'bg-[#39FF14]' },
  ]

  const tasks = [
    { name: 'Check Onchain Score', action: 'Check Score' },
    { name: 'Verify KYC', action: 'Start KYC' },
    { name: 'Get Aadhar Certified', action: 'Certify' },
    { name: 'Get Work/Business Verified', action: 'Verify' },
  ]

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save the changes to a backend
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserInfo(prevState => ({ ...prevState, [name]: value }))
  }

  const ProfileView = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Image
          src={userInfo.profileImage}
          alt={userInfo.name}
          className="rounded-full w-24 h-24 object-cover border-4 border-black"
          width={100}
          height={100}
        />
        <div>
          <h2 className="text-2xl font-bold">{userInfo.name}</h2>
          <p className="text-gray-600">@{userInfo.username}</p>
        </div>
      </div>
      <p className="text-lg">{userInfo.bio}</p>
      <div className="space-y-2">
        <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {userInfo.email}</p>
        <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {userInfo.location}</p>
        <p className="flex items-center"><LinkIcon className="w-4 h-4 mr-2" /> {userInfo.website}</p>
      </div>
      <div className="flex space-x-4">
        {badges.map((badge, index) => (
          <div key={index} className={`${badge.color} ${badge.textColor || 'text-black'} px-2 py-1 rounded-md text-sm font-bold flex items-center space-x-1 border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)]`}>
            {badge.icon} <span>{badge.name}</span> {badge.value && <span>: {badge.value}</span>}
          </div>
        ))}
      </div>
    </div>
  )

  const EditView = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Image
          src={userInfo.profileImage}
          alt={userInfo.name}
          className="rounded-full w-24 h-24 object-cover border-4 border-black"
          width={100}
          height={100}
        />
        <button className="bg-[#39FF14] text-black px-3 py-1 rounded-md font-bold text-sm hover:bg-[#32D612] transition-colors border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)]">
          Change Photo
        </button>
      </div>
      <div className="space-y-2">
        <input
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          className="w-full p-2 border-2 border-black rounded-md"
          placeholder="Name"
        />
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          className="w-full p-2 border-2 border-black rounded-md"
          placeholder="Username"
        />
        <textarea
          name="bio"
          value={userInfo.bio}
          onChange={handleChange}
          className="w-full p-2 border-2 border-black rounded-md"
          placeholder="Bio"
          rows={3}
        />
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          className="w-full p-2 border-2 border-black rounded-md"
          placeholder="Email"
        />
        <input
          type="text"
          name="location"
          value={userInfo.location}
          onChange={handleChange}
          className="w-full p-2 border-2 border-black rounded-md"
          placeholder="Location"
        />
        <input
          type="url"
          name="website"
          value={userInfo.website}
          onChange={handleChange}
          className="w-full p-2 border-2 border-black rounded-md"
          placeholder="Website"
        />
        <input
          type="number"
          name="onchainScore"
          value={userInfo.onchainScore}
          onChange={handleChange}
          className="w-full p-2 border-2 border-black rounded-md"
          placeholder="Onchain Score"
          min="0"
          max="100"
        />
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black font-mono">
      <div className="mb-8">
        {isEditing ? <EditView /> : <ProfileView />}
        <div className="mt-4">
          <button
            onClick={isEditing ? handleSave : handleEdit}
            className="bg-[#39FF14] text-black px-4 py-2 rounded-md font-bold hover:bg-[#32D612] transition-colors border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)]"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Complete Tasks to Earn Badges</h3>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-md border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)]">
              <span>{task.name}</span>
              <button className="bg-[#39FF14] text-black px-3 py-1 rounded-md font-bold text-sm hover:bg-[#32D612] transition-colors border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)] flex items-center">
                {task.action}
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}