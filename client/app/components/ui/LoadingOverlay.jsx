import LogoSpinner from './LogoSpinner';

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,10,15,0.7)] backdrop-blur-lg">
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent opacity-20 blur-[100px] -translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-400 opacity-10 blur-[100px] translate-x-1/3 translate-y-1/3" />

            <div className="relative flex flex-col items-center gap-4">
                <LogoSpinner />

                <span className="text-sm text-muted">
                    Loading...
                </span>
            </div>
        </div>
    );
};

export default LoadingOverlay;