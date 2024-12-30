export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Cosmic Bunny. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
