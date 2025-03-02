"use client"

import React, { FormEvent, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setError("")
            setLoading(true)
            if (!email.trim() || !password.trim()) {
                return setError("all input must be filled")
            }

            await axios.post(`/api/auth/login`, {
                email,
                password
            }, {
                withCredentials: true
            })

            router.push("/dashboard")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error) {
                setError(`Login failed: ${error.response.data.error}`);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className='w-[400px] shadow-xl'>
            <CardHeader className='flex flex-col justify-center items-center'>
                <CardTitle className='text-xl font-bold'>Welcome Back</CardTitle>
                <CardDescription>Enter your email to sign in to your account</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='space-y-1'>
                        <label htmlFor='Email'>Email</label>
                        <Input type='text' placeholder='Email' id='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor='password'>Password</label>
                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} placeholder='password' id='password' className='pr-10' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                    <Button className='w-full' disabled={loading}>Sign In</Button>
                    <p className='text-red-500'>{error}</p>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginForm