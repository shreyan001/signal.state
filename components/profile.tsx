'use client'
import React, { useState, useEffect } from 'react'
import { Medal, CheckCircle, Briefcase, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useAccount, useEnsName } from 'wagmi'

// Function to generate a random cat-related username
const generateCatUsername = (address: string) => {
  const catPrefixes = ['super', 'mega', 'ultra', 'cosmic', 'ninja', 'cyber', 'quantum', 'hyper', 'thunder', 'lightning']
  const catSuffixes = ['cat', 'kitten', 'feline', 'paw', 'whisker', 'purr', 'meow', 'claw', 'tail', 'fur']
  const randomNumber = parseInt(address.slice(-4), 16) % 100 // Use last 4 characters of address for randomness

  const prefix = catPrefixes[Math.floor(Math.random() * catPrefixes.length)]
  const suffix = catSuffixes[Math.floor(Math.random() * catSuffixes.length)]

  return `${prefix}${suffix}${randomNumber}`
}

export default function Component() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    username: '',
    bio: '',
    nomisScore: '1',
    role: 'Onchain Wanderer',
    profilePhoto: '',
    onchainVerified: false,
    aadharVerified: false,
    coinbaseVerified: false,
  })

  useEffect(() => {
    const fetchOrCreateProfile = async () => {
      if (isConnected && address) {
        try {
          const response = await fetch(`/api/auth/users?address=${address}`)
          console.log('Fetch response status:', response.status);
          
          if (response.ok) {
            const data = await response.json()
            console.log('Fetched profile data:', data);
            
            if (Array.isArray(data) && data.length > 0) {
              // We got a non-empty array, use the first profile
              setUserInfo(data[0])
            } else if (Array.isArray(data) && data.length === 0) {
              console.log('No existing profile found, creating a new one');
              // Profile doesn't exist, create a new one
              const newProfile = {
                username: generateCatUsername(address),
                address: address,
                role: 'Onchain Wanderer',
                profilePhoto: `https://robohash.org/${address}.png?set=set4`,
                nomisScore: 'unchecked',
                bio: 'New to the onchain world',
                onchainVerified: false,
                aadharVerified: false,
                coinbaseVerified: false,
              }
              const createResponse = await fetch('/api/auth/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProfile),
              })
              if (createResponse.ok) {
                const createdProfile = await createResponse.json()
                setUserInfo(createdProfile)
              } else {
                console.error('Failed to create profile')
              }
            } else if (typeof data === 'object' && data !== null) {
              // We got a single profile object
              setUserInfo(data)
            } else {
              console.error('Unexpected data format received:', data);
            }
          } else {
            console.error('Failed to fetch profile:', response.status, response.statusText);
            // Handle error case
          }
        } catch (error) {
          console.error('Error fetching or creating profile:', error)
        }
      }
    }

    fetchOrCreateProfile()
  }, [isConnected, address])

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/auth/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userInfo, address }),
      })
      if (response.ok) {
        const updatedProfile = await response.json()
        setUserInfo(updatedProfile)
        setIsEditing(false)
      } else {
        console.error('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserInfo(prevState => ({ ...prevState, [name]: value }))
  }

  const badges = [
    { name: 'Nomis Score', icon: <Medal className="w-4 h-4" />, color: 'bg-yellow-400', textColor: 'text-black', value: userInfo.nomisScore ? `${userInfo.nomisScore}/100` : 'N/A' },
    { name: 'Onchain Verified', icon: <CheckCircle className="w-4 h-4" />, color: userInfo.onchainVerified ? 'bg-green-400' : 'bg-gray-400', textColor: 'text-black' },
    { name: 'Aadhar Verified', icon: <CheckCircle className="w-4 h-4" />, color: userInfo.aadharVerified ? 'bg-green-400' : 'bg-gray-400', textColor: 'text-black' },
    { name: 'Coinbase Verified', icon: <CheckCircle className="w-4 h-4" />, color: userInfo.coinbaseVerified ? 'bg-green-400' : 'bg-gray-400', textColor: 'text-black' },
    { name: userInfo.role, icon: <Briefcase className="w-4 h-4" />, color: 'bg-blue-400', textColor: 'text-black' },
  ]

  const tasks = [
    { name: 'Complete Onchain Verification', action: 'Verify', handler: () => console.log('Onchain verification placeholder') },
    { name: 'Verify Aadhar', action: 'Verify', handler: () => console.log('Aadhar verification placeholder') },
    { name: 'Connect Coinbase', action: 'Connect', handler: () => console.log('Coinbase connection placeholder') },
    { name: 'Generate Nomis Score', action: 'Generate', handler: () => console.log('Nomis score generation placeholder') },
  ]

  const ProfileView = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Image
          src={userInfo.profilePhoto}
          alt={userInfo.username}
          className="rounded-full w-24 h-24 object-cover border-4 border-black"
          width={100}
          height={100}
        />
        <div>
          <h2 className="text-2xl font-bold">{userInfo.username}</h2>
          <p className="text-gray-600">@{ensName || address}</p>
        </div>
      </div>
      <p className="text-lg">{userInfo.bio}</p>
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
          src={userInfo.profilePhoto}
          alt={userInfo.username}
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
          type="text"
          name="role"
          value={userInfo.role}
          onChange={handleChange}
          className="w-full p-2 border-2 border-black rounded-md"
          placeholder="Role"
        />
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto bg-white text-black font-mono">
      {isConnected ? (
        <>
          <div className="mb-4">
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

          <div>
            <h3 className="text-xl font-bold mb-4">Tasks</h3>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-md border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)]">
                  <span>{task.name}</span>
                  <button 
                    onClick={task.handler}
                    className="bg-[#39FF14] text-black px-3 py-1 rounded-md font-bold text-sm hover:bg-[#32D612] transition-colors border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)] flex items-center"
                  >
                    {task.action}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl font-bold">Please connect your wallet to view your profile.</p>
        </div>
      )}
    </div>
  )
}
