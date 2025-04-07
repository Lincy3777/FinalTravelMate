'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    session?: Session | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ session }) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!session) {
            return LoginModal.onOpen();
        }
        rentModal.onOpen();
    }, [session, LoginModal, rentModal]);

    const isAdmin = session?.user?.email === "admin@gmail.com"; // Check if user is Admin

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-200 transition cursor-pointer"
                >
                    List Your Unique Stay
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:px-2 md:py-1 border-[1px] border-neutral-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={session?.user?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {session ? (
                            <>
                                <MenuItem onClick={() => router.push("/trips")} label="My Bookings" />
                                <MenuItem onClick={() => router.push("/favorites")} label="My Favorites" />
                                <MenuItem onClick={() => router.push("/reservations")} label="My Reservations" />
                                <MenuItem onClick={() => router.push("/properties")} label="My Properties" />
                                <MenuItem onClick={rentModal.onOpen} label="My Stay" />
                                
                                {/* Show Analytics option only for Admin */}
                                {isAdmin && (
                                    <MenuItem onClick={() => router.push("/analytics")} label="Analytics" />
                                )}

                                <hr />
                                <MenuItem onClick={() => signOut()} label="Logout" />
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={LoginModal.onOpen} label="Login" />
                                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
