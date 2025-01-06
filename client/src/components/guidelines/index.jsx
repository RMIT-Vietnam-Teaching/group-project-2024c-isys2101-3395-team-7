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
                                <strong>Recognition</strong>: The system will attempt to recognize the handwritten text and display it in
                                digital format.
                            </li>
                            <li>
                                <strong>Correction</strong>: The system will identify and suggest corrections for any mis-recognized
                                characters
                            </li>
                            <li>
                                <strong>Review & Learning</strong>: Users can review the system's analysis, learn from the corrections,
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
                    </div>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div>
                            <p className="font-semibold text-pink">
                                STEP 1:
                            </p>
                            <p>
                                <strong>Browse your file</strong>: Choose the image containing your handwritten Vietnamese text. Supported file formats include:
                                <ul>
                                    <li>
                                        JPEG (.jpg, .jpeg)
                                    </li>
                                    <li>
                                        PNG (.png)
                                    </li>
                                    <li>
                                        PDF (.HEIC)
                                    </li>
                                </ul>
                                    <strong>Choose another file</strong>: Choose another image.
                                <br/>
                                    <strong>Submit file</strong>: Click the button to send the Image to our Service.
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
                            <strong className="font-semibold text-pink">
                                STEP 2:
                            </strong>
                            <p>
                                The system will begin processing your handwriting.
                                This may take a few seconds or minutes depending on the complexity and size of the file.
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
                        STEP 3: Once processing is complete, the system will display:
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
                                On the left side: The system will display your uploaded file for better comparison.
                                <ul>
                                    <li>
                                        <strong>Uploaded file</strong>: You submitted request will display here.
                                    </li>
                                    <li>
                                        <strong>Upload a new One</strong>: Upload the same handwriting file again for another attempt or Upload a different handwriting file for further analysis.
                                    </li>
                                </ul>

                            </p>
                        </div>
                    </div>
                    <div className={"grid grid-cols-2 gap-4 justify-items-center"}>
                        <div>
                            <p>
                                On the right side: The system will return the corrected version and point out the incorrect words, letters,
                                dialects in wrong handwriting form:
                                <ul>
                                    <li><strong>Feedback</strong>: Any incorrect grammars, spellings, or vocabularies will be noted and display here, alongside with suggestions, recommendations for improvements.</li>
                                    <li><strong>Recognized Text</strong>: The system's transcript of your handwriting.</li>
                                </ul>
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
                        This feature allows users to upload recorded Vietnamese speech and receive instant
                        feedback, including:
                        <ul>
                            <li>
                                <strong>Recognition</strong>: The system will attempt to recognize the recorded speech and display it in
                                digital format.
                            </li>
                            <li>
                                <strong>Correction</strong>: The system will identify and suggest corrections for any mis-recognized
                                characters.
                            </li>
                            <li>
                                <strong>Review & Learning</strong>: Users can review the system's analysis, learn from the corrections,
                                and resubmit their records for further suggestions.

                            </li>
                        </ul>
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
                            <div>
                                <p>

                                    Before Recording: This area initially displays instructions on how to achieve optimal audio quality for recording. These instructions might include:
                                    <strong>Browse your file</strong>: Choose the recording containing your handwritten
                                    Vietnamese text. All audio file formats are currently supported.
                                    <br/>
                                    <strong>Or</strong>,
                                    <br/>
                                    Press <strong>Start</strong>: to record an audio on the spot. It is recommended that you are using a quiet environment with minimal background noise, speaking clearly and at a moderate pace, and ensuring proper microphone placement.
                                    <br/>
                                    Press <strong>Stop</strong>: to stop and conclude the recording.
                                    <br/>
                                    Press <strong>Start</strong> again: to start a brand new recording.
                                    <br/>
                                    <strong>Choose another file</strong>: Choose another audio file.
                                    <br/>
                                    <strong>Submit file</strong>: Click the button to send the Recording to our Service.
                                </p>
                            </div>
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
                                The system will begin processing your audio.
                                This may take a few seconds or minutes depending on the complexity and size of the file.
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
                                    Left Section: Recorded Audio and Playback:
                                    <ul>
                                        <li><strong>Original Audio</strong>: This section will display a waveform visualization of the recorded audio. You can replay the audio</li>
                                        <li><strong>Transcribed Audio</strong>: This area will transcribe what you spoke in the file above.</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                        <div className={"grid grid-cols-2 gap-4"}>
                            <div>
                                <p>
                                    Right Section: Recording Controls and Feedback
                                    <ul>
                                        <li><strong>Corrected audio version with AI voice</strong>: This section will display a waveform visualization of the audio spoken by an AI voice. You can play this audio to listen to the corrected version spoken in corrected tone by the AI.</li>
                                        <li><strong>Feedback</strong>: Detailed feedback on pronunciation, grammar, and vocabulary. This might include:
                                            <ul>
                                                <li>Identifying specific sounds that were mispronounced.</li>
                                                <li>Providing examples of correct pronunciation.</li>
                                                <li>Offering suggestions for improving fluency and intonation.</li>
                                            </ul>
                                            </li>
                                        <li><strong>Audio Transcript:</strong>: The system's transcript of your Original Audio.</li>
                                    </ul>
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
                        This feature allows you to manage your history and favorite sections. You can:
                        <ul>
                            <li>Switch between History and Favorite Tab.</li>
                            <li>Filter: by Voice or Handwriting Feature.</li>
                            <li>Add the item to favorite, the item will also appear in Favorite Tab.</li>
                            <li>Delete the item permanently from both lists.</li>
                        </ul>
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
                                Clicking on the item will review the detail.
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
                        This feature allows you to practice your existing knowledge by passing exercises.
                    </p>
                    <Image
                        src="/exercises-main-screen.png"
                        width={1776}
                        height={873}
                        alt="Exercises Main Screen"
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