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
                        Viego is your comprehensive platform for learning the Vietnamese language. Designed with user-friendliness in mind, Viego caters to diverse learning styles and offers a range of interactive features to help you on your language learning journey.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 pt-8">
                        How to Use Viego as your Vietnamese language learning app in steps:
                    </h2>
                </div>
                {/*Handwriting Section*/}
                <CollapsibleSection title="Use Handwriting Detection and Correction Feature">
                    <div>
                        <p className={"pt-4"}>
                            This feature allows users to upload handwritten Vietnamese text and receive instant
                            feedback, including:
                        </p>
                        <ul className={"pt-2"}>
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
                    <div className={"pt-8"}>
                        <Image
                            src="/handwriting-main-screen.png"
                            width={1776}
                            height={873}
                            alt="Handwriting Main Screen"
                        />
                    </div>
                    <div className={"grid grid-cols-2 gap-4 pt-8"}>
                        <div className={""}>
                            <h3 className="font-semibold text-pink pt-8 pb-4">
                                STEP 1:
                            </h3>
                                <strong>Browse your file</strong>: Choose the image containing your handwritten Vietnamese text. Supported file formats include:
                                <ul  className={"pt-2 italic pb-2 "}>
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

                        </div>
                        <div className={"grid justify-items-center pt-8"}>
                            <Image
                                src="/handwriting-upload-screen.png"
                                width={210 * 2}
                                height={200 * 2}
                                alt="Step 1"
                            />
                        </div>
                    </div>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div className={"pt-8"}>
                            <h3 className="font-semibold text-pink pt-8 pb-4">
                                STEP 2:
                            </h3>
                            <p>
                                The system will begin processing your handwriting.
                                This may take a few seconds or minutes depending on the complexity and size of the file.
                            </p>
                        </div>
                        <div className={"grid justify-items-center pt-4"}>
                            <Image
                                src="/handwriting-loading.png"
                                width={1766}
                                height={875}
                                alt="Step 2"
                            />
                        </div>
                    </div>
                    <h3 className="font-semibold text-pink pt-8 pb-4">
                        STEP 3: Once processing is complete, the system will display:
                    </h3>
                    <Image src={"/handwriting-feedback.png"}
                           width={1776}
                           height={873}
                           alt={"Handwriting Feedback"}
                    />

                    <div className={"grid grid-cols-2 gap-4 justify-items-center"}>
                        <div className={"pt-4"}>
                            <Image
                                src="/handwriting-feedback-left.png"
                                width={210 * 2}
                                height={200 * 2}
                                alt="corrected version"
                            />
                        </div>
                        <div className={"pt-4"}>
                                On the left side: The system will display your uploaded file for better comparison.
                                <ul className={"pt-2"}>
                                    <li>
                                        <strong>Uploaded file</strong>: You submitted request will display here.
                                    </li>
                                    <li>
                                        <strong>Upload a new One</strong>: Upload the same handwriting file again for another attempt or Upload a different handwriting file for further analysis.
                                    </li>
                                </ul>

                        </div>
                    </div>
                    <div className={"grid grid-cols-2 gap-4 justify-items-center pb-8"}>
                        <div className={"pt-4"}>
                                On the right side: The system will return the corrected version and point out the incorrect words, letters,
                                dialects in wrong handwriting form:
                                <ul className={"pt-4"}>
                                    <li><strong>Feedback</strong>: Any incorrect grammars, spellings, or vocabularies will be noted and display here, alongside with suggestions, recommendations for improvements.</li>
                                    <li><strong>Recognized Text</strong>: The system's transcript of your handwriting.</li>
                                </ul>
                        </div>
                        <div className={"pt-4"}>
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
                    <div className={"pt-8"}>
                        This feature allows users to upload recorded Vietnamese speech and receive instant
                        feedback, including:
                        <ul className={"pt-2 pb-2"}>
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
                    </div>
                    <Image
                        src="/voice-main-screen.png"
                        width={1776}
                        height={873}
                        alt="Voice Main Screen"
                    />
                    <div className={"grid grid-cols-2 gap-4 pb-8 pt-8"}>
                        <div>
                            <h3 className="font-semibold text-pink pt-8 pb-4">
                                STEP 1:
                            </h3>
                            <div>
                                <p className={"pb-4"}>
                                    Before Recording: This area initially displays instructions on how to achieve optimal audio quality for recording. These instructions might include:
                                    <br/>
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
                            <h3 className="font-semibold text-pink pt-8 pb-4">
                                STEP 2:
                            </h3>
                            <p className={"pb-4"}>
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
                    <h3 className="font-semibold text-pink pt-8 pb-4">
                        STEP 3:
                    </h3>
                    <div className={""}>
                        <div className={"grid justify-items-center"}>
                            <Image
                                src="/voice-feedback.png"
                                width={1766}
                                height={875}
                                alt="Voice feedback screen"
                            />
                        </div>
                        <div className={"grid grid-cols-2 gap-4 pt-8"}>
                            <div className={"grid justify-items-center"}>
                                <Image
                                    src="/voice-feedback-left.png"
                                    width={210 * 2}
                                    height={200 * 2}
                                    alt="Voice feedback screen"
                                />
                            </div>
                            <div className={"pt-4"}>
                                    Left Section: Recorded Audio and Playback:
                                    <ul className={
                                        "pt-2 pb-2"
                                    }>
                                        <li><strong>Original Audio</strong>: This section will display a waveform visualization of the recorded audio. You can replay the audio</li>
                                        <li><strong>Transcribed Audio</strong>: This area will transcribe what you spoke in the file above.</li>
                                    </ul>
                            </div>
                        </div>
                        <div className={"grid grid-cols-2 gap-4 pt-8"}>
                            <div>
                                    Right Section: Recording Controls and Feedback
                                    <ul className={"pt-2 pb-2"}>
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
                            </div>
                            <div className={"grid justify-items-center pt-4"}>
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
                <CollapsibleSection title="Use Activity Management Feature">
                    <div className={"pt-8"}>
                        This feature allows you to manage your history and favorite sections. You can:
                        <ul className={"pt-2 pb-8"}>
                            <li><strong>Switch</strong> between History and Favorite Tab.</li>
                            <li><strong>Filter</strong>: by Voice or Handwriting Feature.</li>
                            <li><strong>Add</strong> the item to favorite, the item will also appear in Favorite Tab.</li>
                            <li><strong>Delete</strong> the item permanently from both lists.</li>
                        </ul>
                    </div>
                    <Image
                        src="/user-activity-main-screen.png"
                        width={1776}
                        height={873}
                        alt="Activity Main Screen"
                    />
                    <div className={"grid gap-4 pt-8 pb-8"}>
                        <div className={"pt-4 pb-4"}>
                            <p>
                                Clicking on each item will allow you to review the item in detail:
                            </p>
                        </div>
                        <div className={"pt-2"}>
                            <Image
                                src="/user-activity-pop-up.png"
                                width={1767}
                                height={874}
                                alt="pop-up activity screen"
                            />
                        </div>
                    </div>
                </CollapsibleSection>
                {/*Lessons Section*/}
                <CollapsibleSection title="Use Lessons Feature">
                    <p className={"pt-8 pb-4"}>
                        This feature allows you to access a library of pre-designed lessons, ranging from beginner to advanced levels randomly.
                        <br/>
                        You will be able to use this feature like a book.
                    </p>
                    <Image
                        src="/lessons-main-screen.png"
                        width={1776}
                        height={873}
                        alt="Lessons Main Screen"
                    />
                    <div className={"grid grid-cols-2 gap-4 pt-8 pb-8"}>
                        <div className={"pb-4"}>
                            <p>
                                This pop-up window will allow you to generate new lessons.
                                <br/>
                                You can generate new lessons with the minimum of 1 lessons and a maximum of 10 each time.
                            </p>
                        </div>
                        <div className={"grid justify-items-center pb-4"}>
                            <Image
                                src="/lessons-pop-up.png"
                                width={368}
                                height={189}
                                alt="pop-up lesson screen"
                            />
                        </div>
                    </div>
                </CollapsibleSection>
                {/*Exercises Section*/}
                <CollapsibleSection title="Use Exercises Feature">
                    <p className={"pt-8 pb-4"}>
                        This feature allows you to practice your Vietnamese language skill through interactive exercises.
                    </p>
                    <Image
                        src="/exercises-main-screen.png"
                        width={1776}
                        height={873}
                        alt="Exercises Main Screen"
                    />
                    <div className={"grid grid-cols-2 gap-4 pt-8"}>
                        <div>
                            <p>
                                This pop-up window will allow you to generate new exercises.
                                <br/>
                                You can generate new exercises with the minimum of 1 lessons and a maximum of 10 each time.
                            </p>
                        </div>
                        <div className={"grid justify-items-center pt-4"}>
                            <Image
                                src="/exercises-pop-up.png"
                                width={404}
                                height={190}
                                alt="pop-up exercise screen"
                            />
                        </div>
                    </div>
                    <div className={"grid gap-4 pt-8"}>
                        <div className={"pt-4"}>
                            <p className={"pb-4"}>
                                There are two types of questions: Handwriting & Voice.
                                <br/>
                                For Handwriting Question Type, You will need to upload the picture of your hand-written answer.
                                <br/>
                                For Voice Question Type, You will need to record your answer.
                                <br/>
                                Your answer will be processed and feedback immediately as you clicked on Next Exercise. Once you are on the next exercise, you cannot re-do your submitted answer.
                            </p>
                        </div>
                        <div className={"grid justify-items-center pt-4"}>
                            <Image
                                src="/exercises-exercise.png"
                                width={1772}
                                height={879}
                                alt="exercise screen"
                            />
                        </div>
                    </div>
                </CollapsibleSection>

                <GoToTopButton/>
            </div>
        </>
    )
}