"use client"

const Sidebar = () => {
    return (
        <>
            <div className="w-1/4 bg-black text-white h-screen p-4">
                <ul className="space-y-4">
                    <li>
                        <a href="#lesson1" className="block hover:underline">
                            Lesson 1
                        </a>
                    </li>
                    <li>
                        <a href="#lesson2" className="block hover:underline">
                            Lesson 2
                        </a>
                    </li>
                    <li>
                        <a href="#lesson3" className="block hover:underline">
                            Lesson 3
                        </a>
                    </li>
                    <li>
                        <a href="#lesson4" className="block hover:underline">
                            Lesson 4
                        </a>
                    </li>
                    <li>
                        <a href="#lesson5" className="block hover:underline">
                            Lesson 5
                        </a>
                    </li>
                    <li>
                        <a href="#lesson6" className="block hover:underline">
                            Lesson 6
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar