function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="small-title">VINTAGE • STREETWEAR • GRAILS</p>

          <h1>
            WEAR THE
            <br />
            <span>PAST.</span>
          </h1>

          <p className="hero-text">
            Curated vintage pieces for people who wear their own story.
          </p>

          <button className="shop-btn">SHOP NOW →</button>
        </div>
      </section>

      <section className="categories">
        <p className="section-label">EXPLORE</p>

        <h2>SHOP BY CATEGORY</h2>

        <div className="category-grid">
          <div className="category-card">JORTS</div>
          <div className="category-card">GRAILS</div>
          <div className="category-card">BOTTOMS</div>
          <div className="category-card">JERSEYS</div>
        </div>
      </section>

      <section className="featured">
        <p className="section-label">CURATED FOR YOU</p>

        <h2>TRENDING GRAILS</h2>

        <div className="product-grid">
          <div className="product-card">
            <div className="product-image">PRODUCT IMAGE</div>
            <h3>Vintage Graphic Tee</h3>
            <p>₹1,999</p>
          </div>

          <div className="product-card">
            <div className="product-image">PRODUCT IMAGE</div>
            <h3>Vintage Denim</h3>
            <p>₹2,499</p>
          </div>

          <div className="product-card">
            <div className="product-image">PRODUCT IMAGE</div>
            <h3>Retro Jersey</h3>
            <p>₹2,999</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;