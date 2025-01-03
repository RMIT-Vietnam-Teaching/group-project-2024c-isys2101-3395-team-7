import CollapsibleSection from "@/components/guidelines/CollasibleSection";

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
                        This section provides a brief introduction to the Viego platform, highlighting its purpose as a comprehensive tool for learning Vietnamese. It emphasizes the platform's user-friendly interface and its ability to cater to various learning styles.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        How to Use Viego as your Vietnamese language learning app in steps:
                    </h3>
                </div>

                {/* Feature Section */}

                {/* Reusable Collapsible Sections */}
                {/*Handwriting Section*/}
                <CollapsibleSection title="Use Handwriting Detection and Correction Feature">
                    <p>
                        Handwriting Detection and Correction will detect your handwriting work, process, and evaluate your work as well as give you reviews, feedbacks
                    </p>
                    <p className="font-semibold text-pink">
                            STEP 1:
                    </p>
                    <p>
                        Upload your file with hand-writing in Vietnamese
                    </p>
                    <p className="font-semibold text-pink">
                            STEP 2:
                    </p>
                    <p>
                        The system will be processing your prompt
                    </p>
                    <p className="font-semibold text-pink">
                            STEP 3:
                    </p>
                    <p>
                        The system will return the corrected version and point out the incorrect words, letters, dialects in wrong handwriting form.
                    </p>
                </CollapsibleSection>
                {/*Voice Section*/}
                <CollapsibleSection title="Use Voice Detection and Correction Feature">
                    <p>
                        The Voice Detection and Correction Feature will
                    </p>
                    <p className="font-semibold text-pink">
                        STEP 1:
                    </p>
                    <p>
                        Upload your file with hand-writing in Vietnamese
                    </p>
                    <p className="font-semibold text-pink">
                        STEP 2:
                    </p>
                    <p>
                        The system will be processing your prompt
                    </p>
                    <p className="font-semibold text-pink">
                        STEP 3:
                    </p>
                    <p>
                        The system will...
                    </p>
                </CollapsibleSection>
                {/*Quiz Section*/}
                <CollapsibleSection title="Use Lessons Feature">
                    <p>
                        The Sentence Correction Tool analyzes your sentences and provides
                        grammar suggestions to improve writing skills.
                    </p>
                </CollapsibleSection>
                <CollapsibleSection title="Use Exercises Feature">
                    <p>
                        The Sentence Correction Tool analyzes your sentences and provides
                        grammar suggestions to improve writing skills.
                    </p>
                </CollapsibleSection>
            </div>
        </>
    )
}