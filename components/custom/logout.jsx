import React from 'react'
import { Button } from '../ui/button';
import { RxCross1 } from 'react-icons/rx';
import { CiWarning } from 'react-icons/ci';
import { logout } from '@/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import useLogout from '@/hooks/useLogout';
import { useRouter } from 'next/navigation';

const Logout = ({ onClose, setIsLogoutOpen }) => {
    const { performLogout, loading, error } = useLogout();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            // ✅ Backend logout request
            await performLogout();

            setIsLogoutOpen(false);
            console.log("Logged out");
            router.push("/user");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 h-[100vh]">
            <div className="flex flex-col p-5 gap-4 bg-white rounded-xl shadow-lg w-[clamp(15rem,30vw,18rem)]">
                {/*heading and cross*/}
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-md font-bold text-stone-800">Logging out</h2>
                    <span
                        onClick={onClose}
                        className="text-sm text-stone-800 rounded-full bg-stone-200  hover:text-stone-600 cursor-pointer transition-all p-1 "
                    >
                        <RxCross1 size={14} className="text-md" />
                    </span>
                </div>

                 <h2 className="text-[clamp(0.9rem,3vw,1rem)]  text-stone-800">you will be logged out of this device</h2>

                {/*ok and cancel button*/}
                <div className="flex justify-end items-center space-x-2 pt-2">
                   
                    <Button
                        disabled={loading}
                        variant="cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                     <Button
                        variant="logout"
                        onClick={handleLogout} // Replace with actual logout logic
                    >
                        Ok
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Logout