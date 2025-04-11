const RecipeCardSkeleton = () => {
    return (
        <div className="card" style={{ width: '14rem', borderRadius: '15px', overflow: "hidden" }}>
            <div className="placeholder-glow">
                <div
                    className="card-img-top bg-secondary placeholder"
                    style={{ height: '140px'}}
                ></div>
            </div>
            <div className="card-body" >
                <h5 className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                    <span
                        className="placeholder col-7"
                        style={{ backgroundColor: 'var(--primary-color)' }} 
                    ></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-2"></span>
                </p>
                <button
                    className="btn disabled placeholder col-6"
                    style={{ backgroundColor: 'var(--accent-color)', border:'none'}} 
                ></button>
            </div>
        </div>
    );
};

const SkeletonGroup = ({ count = 3 }) => (
    <div className="recipes-container">
        {Array(count).fill(0).map((_, i) => (
            <RecipeCardSkeleton key={i} />
        ))}
    </div>
);

export { RecipeCardSkeleton, SkeletonGroup };
