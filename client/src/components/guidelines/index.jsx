"use client"
import CollapsibleSection from "@/components/guidelines/CollasibleSection";
import Image from 'next/image'
import GoToTopButton from "@/components/guidelines/GoToTopButton";
import {Link, Button, Element, Events, animateScroll as scroll, scrollSpy} from 'react-scroll';
import React, {useEffect} from "react";

export default function guidelines() {
    return (
        <>
            <div className="container mx-auto px-6 py-8">

                {/* Title */}
                <h1 className="text-4xl font-bold text-center mb-6">
                    User Guides on Viego - Vietnamese Language Learning Platform
                </h1>

                {/* Welcome Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-2">Welcome to Viego</h2>
                    <p className="text-gray-600 leading-relaxed">
                        This section provides a brief introduction to the Viego platform, highlighting its purpose as a
                        comprehensive tool for learning Vietnamese. It emphasizes the platform's user-friendly interface
                        and its ability to cater to various learning styles.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        How to Use Viego as your Vietnamese language learning app in steps:
                    </h3>
                </div>
                {/*Handwriting Section*/}
                <CollapsibleSection title="Use Handwriting Detection and Correction Feature">
                    <div>
                        <p>
                            This feature allows users to upload handwritten Vietnamese text and receive instant
                            feedback, including:
                        </p>
                        <ul>
                            <li>
                                Recognition: The system will attempt to recognize the handwritten text and display it in
                                digital format.
                            </li>
                            <li>
                                Correction: The system will identify and suggest corrections for any misrecognized
                                characters
                            </li>

                            <li>

                                Review & Learning: Users can review the system's analysis, learn from the corrections,
                                and resubmit their handwriting for further refinement.

                            </li>
                        </ul>
                    </div>
                    <div>
                        <Image
                            src="/handwriting-main-screen.png"
                            width={1776}
                            height={873}
                            alt="Handwriting Main Screen"
                        />
                        <p>

                        </p>
                    </div>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div>
                            <p className="font-semibold text-pink">
                                STEP 1:
                            </p>
                            <p>
                                Upload your file with hand-writing in Vietnamese
                            </p>
                        </div>
                        <div className={"grid justify-items-center"}>
                            <Image
                                src="/handwriting-upload-screen.png"
                                width={210 * 2}
                                height={200 * 2}
                                alt="Step 1"
                            />
                        </div>
                    </div>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div>
                            <p className="font-semibold text-pink">
                                STEP 2:
                            </p>
                            <p>
                                The system will be processing your prompt
                            </p>
                        </div>
                        <div className={"grid justify-items-center"}>
                            <Image
                                src="/handwriting-loading.png"
                                width={1766}
                                height={875}
                                alt="Step 2"
                            />
                        </div>
                    </div>
                    <p className="font-semibold text-pink">
                        STEP 3:
                    </p>
                    <Image src={"/handwriting-feedback.png"}
                           width={1776}
                           height={873}
                           alt={"Handwriting Feedback"}
                    />
                    <div className={"grid grid-cols-2 gap-4 justify-items-center"}>
                        <div className={""}>
                            <Image
                                src="/handwriting-feedback-left.png"
                                width={210 * 2}
                                height={200 * 2}
                                alt="corrected version"
                            />
                        </div>
                        <div>
                            <p>
                                The system will return the corrected version and point out the incorrect words, letters,
                                dialects in wrong handwriting form.
                            </p>
                        </div>
                    </div>
                    <div className={"grid grid-cols-2 gap-4 justify-items-center"}>
                        <div>
                            <p>
                                The system will return the corrected version and point out the incorrect words, letters,
                                dialects in wrong handwriting form.
                            </p>
                        </div>
                        <div className={""}>
                            <Image
                                src="/handwriting-feedback-right.png"
                                width={210 * 2}
                                height={200 * 2}
                                alt="corrected version"
                            />
                        </div>
                    </div>
                </CollapsibleSection>
                {/*Voice Section*/}
                <CollapsibleSection title="Use Voice Detection and Correction Feature">
                    <p>
                        The Voice Detection and Correction Feature will...
                    </p>
                    <Image
                        src="/voice-main-screen.png"
                        width={1776}
                        height={873}
                        alt="Voice Main Screen"
                    />
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div>
                            <p className="font-semibold text-pink">
                                STEP 1:
                            </p>
                            <p>
                                Upload your file with hand-writing in Vietnamese
                            </p>
                        </div>
                        <div className={"grid justify-items-center"}>
                            <Image
                                src="/voice-upload-screen.png"
                                width={1776}
                                height={873}
                                alt="upload screen"
                            />
                        </div>
                    </div>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div>
                            <p className="font-semibold text-pink">
                                STEP 2:
                            </p>
                            <p>
                                Loading
                            </p>
                        </div>
                        <div className={"grid justify-items-center"}>
                            <Image
                                src="/handwriting-loading.png"
                                width={1766}
                                height={875}
                                alt="Step 2"
                            />
                        </div>
                    </div>
                    <p className="font-semibold text-pink">
                        STEP 3:
                    </p>
                    <div className={""}>
                        <div className={"grid justify-items-center"}>
                            <Image
                                src="/voice-feedback.png"
                                width={1766}
                                height={875}
                                alt="Voice feedback screen"
                            />
                        </div>
                        <div className={"grid grid-cols-2 gap-4"}>
                            <div className={"grid justify-items-center"}>
                                <Image
                                    src="/voice-feedback-left.png"
                                    width={210 * 2}
                                    height={200 * 2}
                                    alt="Voice feedback screen"
                                />
                            </div>
                            <div>
                                <p>
                                    feedback
                                </p>
                            </div>
                        </div>
                        <div className={"grid grid-cols-2 gap-4"}>
                            <div>

                                <p>
                                    feedback
                                </p>
                            </div>
                            <div className={"grid justify-items-center"}>
                                <Image
                                    src="/voice-feedback-right.png"
                                    width={210 * 2}
                                    height={200 * 2}
                                    alt="Voice feedback screen"
                                />
                            </div>
                        </div>
                    </div>

                </CollapsibleSection>
                {/*user activity section*/}
                <CollapsibleSection title="Use Activity Record Feature">
                    <p>
                        To re-view your history and favorite items storage, visit....
                    </p>
                    <Image
                        src="/user-activity-main-screen.png"
                        width={1776}
                        height={873}
                        alt="Activity Main Screen"
                    />
                    <div className={"grid grid-rows-2 gap-4"}>
                        <div className={"grid justify-items-center"}>
                            <Image
                                src="/user-activity-pop-up.png"
                                width={1767}
                                height={874}
                                alt="pop-up activity screen"
                            />
                        </div>
                        <div>

                            <p>
                                pop up
                            </p>
                        </div>
                    </div>
                </CollapsibleSection>
                {/*Lessons Section*/}
                <CollapsibleSection title="Use Lessons Feature">
                    <p>
                        The Sentence Correction Tool analyzes your sentences and provides
                        grammar suggestions to improve writing skills.
                    </p>
                    <Image
                        src="/lessons-main-screen.png"
                        width={1776}
                        height={873}
                        alt="Lessons Main Screen"
                    />
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div>

                            <p>
                                pop up
                            </p>
                        </div>
                        <div className={"grid justify-items-center"}>
                            <Image
                                src="/lessons-pop-up.png"
                                width={368 * 2}
                                height={189 * 2}
                                alt="pop-up lesson screen"
                            />
                        </div>
                    </div>
                </CollapsibleSection>
                {/*Exercises Section*/}
                <CollapsibleSection title="Use Exercises Feature">
                    <p>
                        The Sentence Correction Tool analyzes your sentences and provides
                        grammar suggestions to improve writing skills.
                    </p>
                    <Image
                        src="/lessons-main-screen.png"
                        width={1776}
                        height={873}
                        alt="Lessons Main Screen"
                    />
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div>

                            <p>
                                pop up
                            </p>
                        </div>
                        <div className={"grid justify-items-center"}>
                            <Image
                                src="/exercises-pop-up.png"
                                width={404}
                                height={190}
                                alt="pop-up exercise screen"
                            />
                        </div>
                    </div>
                    <div className={"grid grid-rows-2 gap-4"}>
                        <div className={"grid justify-items-center"}>
                            <Image
                                src="/exercises-exercise.png"
                                width={404}
                                height={190}
                                alt="exercise screen"
                            />
                        </div>
                        <div>
                            <p>
                                pop up
                            </p>
                        </div>
                    </div>
                </CollapsibleSection>

                <GoToTopButton/>
            </div>
        </>
    )
}