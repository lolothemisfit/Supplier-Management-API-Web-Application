export default function Footer()
{
    const year = new Date().getFullYear()

    return (
        <footer className="bg-blue-600 px-6 py-5 text-white md:px-20">

            <div className="mx-auto max-w-7xl text-center">

                <h3 className="text-xl font-bold">
                    Misfit Studios
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                    Building clean, modern web experiences.
                </p>

                <div className="mt-4 border-t border-blue-500 pt-4 text-xs text-blue-100">
                    © {year} Misfit Studios. All rights reserved.
                </div>

            </div>

        </footer>
    )
}