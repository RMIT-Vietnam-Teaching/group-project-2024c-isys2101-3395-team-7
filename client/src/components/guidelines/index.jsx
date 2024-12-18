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
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        How to Use Viego as your Vietnamese language learning app
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Lorem ipsum dolor amet, consectetur adipiscing elit. Hac risus
                        suspendisse consequat nisi primis taciti tempor. Convallis curae
                        torquent convallis maximus fusce commodo. Pretium diam aenean
                        mollis; habitasse magnis scelerisque. Dictum eros tempor rhoncus;
                        blandit cubilia taciti. Magnis nascetur sociosqu ridiculus massa
                        primis ullamcorper. Nulla primis himenaeos rutrum dui molestie
                        magna. Sociosqu dis ac class magna, quis in. Consectetur consequat
                        varius suscipit fames vestibulum; phasellus ligula blandit
                        sollicitudin. Laoreet nisl consectetur vulputate morbi volutpat
                        imperdiet! Pretium volutpat commodo consequat tristique proin; congue
                        taciti. Fermentum sed hac; odio metus interdum ac. Arcu elit quis
                        gravida leo vestibulum venenatis. Nunc aenean proin lobortis rutrum,
                        magn is tortor. Ornare quam donec
                    </p>
                </div>

                {/* Feature Section */}

                {/* Reusable Collapsible Sections */}
                {/*Handwriting Section*/}
                <CollapsibleSection title="Use Image Translation and Correction Feature">
                    <p className="font-semibold text-pink">
                            STEP 1:
                    </p>
                    <p>
                        Purus aenean efficitur sed. Ad sollicitudin enim consequat fringilla
                        hendrerit. Porttitor orci sollicitudin eros laoreet torquent. Laoreet
                        etiam nascetur fusce maximus hendrerit nibh.
                    </p>
                    <p className="font-semibold text-pink">
                            STEP 2:
                    </p>
                    <p>
                        Imperdiet faucibus adipiscing venenatis habitant, sit ac facilisis
                        vehicula. Libero fames tristique tincidunt curabitur fringilla
                        maecenas donec.
                    </p>
                </CollapsibleSection>
                {/*Voice Section*/}
                <CollapsibleSection title="Use Vocabulary Building Feature">
                    <p>
                        The Vocabulary Building Feature helps users enhance their Vietnamese
                        vocabulary using interactive exercises and flashcards.
                    </p>
                    <p>1. Select a category. 2. Practice new words. 3. Test your skills.</p>
                </CollapsibleSection>
                {/*Quiz Section*/}
                <CollapsibleSection title="Use Sentence Correction Tool">
                    <p>
                        The Sentence Correction Tool analyzes your sentences and provides
                        grammar suggestions to improve writing skills.
                    </p>
                    <p>1. Enter your sentence. 2. Receive corrections. 3. Learn why.</p>
                </CollapsibleSection>
            </div>
        </>
    )
}