export default function Footer() {
    return (
        <footer className="bg-lav/70 flex flex-row justify-between items-center py-6 px-4">
            {/* links section */}
            <p className="font-dela text-xl">GoEasy</p>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-start">
                <nav aria-label="footer links" className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <a href="#">Contact Us</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms & Conditions</a>
                </nav>
                <button type="button" className="font-medium" onClick={() => window.scrollTo(0, 0)}>Back to top <i className="bi bi-arrow-up"/></button>
            </div>
        </footer>
    )
}