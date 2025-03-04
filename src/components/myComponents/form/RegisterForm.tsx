"use client"

import React, { FormEvent, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [confPassword, setConfPassword] = useState("")
    const [showConfPassword, setShowConfPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)
            setError("")
            if (!name.trim() || !email.trim() || !password.trim() || !confPassword.trim()) {
                return setError("all input must be filled")
            }

            if (password !== confPassword) {
                return setError("password and confirm password doen't match")
            }

            await axios.post(`/api/auth/register`, {
                name,
                email,
                password,
                confirmPassword: confPassword
            })

            router.push("/dashboard")
        } catch (error) {
            setError(`register failed : ${error}`);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className='w-[400px] shadow-xl'>
            <CardHeader className='flex flex-col items-center'>
                <CardTitle>Create an Admin Account</CardTitle>
                <CardDescription>Enter your details to sign up</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-1'>
                        <label htmlFor='name'>name</label>
                        <Input type='text' placeholder='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor='email'>Email</label>
                        <Input type='email' placeholder='Email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor='password'>Password</label>
                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} placeholder='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
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
                    <div className='space-y-1'>
                        <label htmlFor='confPassword'>Confirm password</label>
                        <div className="relative">
                            <Input type={showConfPassword ? "text" : "password"} placeholder='Confirm password' id='confPassword' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowConfPassword(!showConfPassword)}
                            >
                                {showConfPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                    <Button className='w-full' disabled={loading}>Sign Up</Button>
                    <p className='text-red-500'>{error}</p>
                </form>
            </CardContent>
        </Card>
    )
}

export default RegisterForm