'use client'

import { Button } from "./button";
import PostForm from "./postForm";
import Image from "next/image";
import styles from "@/app/styles/styles.module.css"
import Link from "next/link";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { IoCreate } from "react-icons/io5";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { DropdownMenuContent } from "./dropdown-menu";
import CookieBox from "./cookie-dialog";
import { IoLogoGithub } from "react-icons/io5";

const NavBar = () => {
    return (
        <div className="w-full fixed z-50">
            <div className="w-full h-[60px] opacity-55 absolute"></div>
            <div className="border-b justify-between backdrop-blur-md h-[60px] bg-opacity-80 flex w-full border-opacity-70 border-stone-800">
                <Link href={'/'} className="flex justify-start items-center md:ml-4">
                    <Image src='/PLogoG.png' className="mt-4" sizes="100vw" width={80} height={80} alt='' />
                    <p className="-ml-2 text-stone-200 text-2xl font-medium">rom</p>
                    <p className="text-stone-500 text-2xl font-medium">ptz</p>
                </Link>
                <div className="justify-between items-center flex space-x-4 mr-6">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="aspect-square pl-[2px] pt-0 pr-0 pb-[2px]"><IoCreate size={20} /></Button>
                        </DialogTrigger>
                        <DialogContent className="">
                            <PostForm />
                        </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="aspect-square w-10" asChild>
                            <div className="rounded-full border overflow-hidden bg-gray-200 shadow-md cursor-pointer hover:border-[5px] hover:border-neutral-400 transition-all duration-700">
                                <GiPlagueDoctorProfile size={35} color={'black'} />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Anonymous</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <CookieBox />
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <a className="font-semibold text-sm" href="" target="_blank">What is a Client ID?</a>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <div className="flex items-center justify-between space-x-2">
                                        <IoLogoGithub size={20} />
                                        <a href="https://github.com/Evestir/promptz" target="_blank">Contribute to this repo!</a>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default NavBar;