"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { IoClose } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
 import { ClipLoader } from "react-spinners";
const phoneSchema = z.object({
    phoneNumber: z
        .string()
        .min(10, "Enter a valid mobile number")
        .max(15),
});

export default function PhoneNumberModal({ onClose, onSend, firebaseErrors, isOtpSent, setIsOtpSent, setFirebaseErrors, loading, coolDown }) {
    const phoneInputRef = useRef(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phoneNumber: "",
        },
    });

    const onSubmit = async (data) => {
        setFirebaseErrors(false);
        onSend?.(data.phoneNumber);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
            <div className="bg-white rounded-xl w-[90%] max-w-sm p-6 relative">
                {/* Close Icon */}
               <div className="flex justify-end">
                <button
                    onClick={onClose}
                    className="text-stone-800 hover:text-black hover:bg-stone-300 p-2 bg-stone-200 rounded-full transition-all z-20"
                >
                    <RxCross1 size={18} />
                </button>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <h2 className="text-xl font-semibold mb-2">Enter your mobile number</h2>
                    <p className="text-sm text-muted-foreground mb-6">
                        we’ll send you a verification code on this mobile number
                    </p>

                    <div className="flex items-center border rounded-lg overflow-hidden mb-2">
                        <span className="px-3 text-sm text-stone-500 border-r">+91</span>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="tel"
                                    maxLength={10}
                                    placeholder="Enter mobile number"
                                    className="flex-1 p-4 outline-none placeholder:text-sm placeholder:text-stone-400 text-stone-800 "
                                    onChange={(e) => {
                                        setIsOtpSent(false);
                                        setFirebaseErrors(false);
                                        const onlyNums = e.target.value.replace(/\D/g, "");
                                        field.onChange(onlyNums);
                                    }}
                                    onFocus={() => {
                                        setTimeout(() => {
                                            phoneInputRef.current?.scrollIntoView({
                                                behavior: "smooth",
                                                block: "center",
                                            });
                                        }, 200);
                                    }}
                                    ref={phoneInputRef}
                                />
                            )}
                        />
                    </div>

                    {errors.phoneNumber && (
                        <p className="text-red-500 text-xs my-4 px-1">{errors.phoneNumber.message}</p>
                    )}
                    {firebaseErrors && (
                        <p className="text-red-500 text-xs my-4 px-1">{firebaseErrors}</p>
                    )}

                    {coolDown > 0 ? (
                        <Button
                            size="otp"
                            disabled
                        >
                            resend in {coolDown}s
                        </Button>
                    ) : (
                        <Button
                            size="otp"
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={16} color="#fff" /> : "Send OTP"}
                        </Button>
                    )}

                </form>
            </div>
        </div>
    );
}
