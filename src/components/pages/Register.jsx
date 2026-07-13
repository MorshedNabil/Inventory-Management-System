import React from 'react'
import Images from '../Images'
import logo from '/src/assets/logo.png'
import { Link } from 'react-router-dom';
import Container from '../Container'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Register = () => {
  return (
        <>
   
<Container className={"flex"}>
   
       <Card className="w-[500px] mx-auto max-w-sm lg:mt-40 mt-20  ">
        <Images imgSrc={logo} className={"h-36 w-52 mx-auto"}/>
      <CardHeader>
        
        <CardTitle>Create Your <span className="text-[#45BA8C] text-xl">Account</span></CardTitle>
        <CardDescription>
          Get started with Urban Threads
        </CardDescription>
        <CardAction>
          <Link to="/login"><Button variant="link" className="hover:text-[#45BA8C] duration-300">Login</Button></Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Enter Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jhon Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jhondoe@example.com"
                required
              />
                          <div className="grid gap-2">
              <Label htmlFor="phnNo">Enter Your Phone No</Label>
              <Input
                id="phnNo"
                type="number"
                placeholder="01*********"
                required
              />
            </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Create Password</Label>
                
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-[#3E5067] hover:bg-[#45BA8C] duration-300">
          Register
        </Button>
        
      </CardFooter>
    </Card>
    
   
    </Container>

    
    </>
  )
}

export default Register