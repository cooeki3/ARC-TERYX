

function CollectionCard({ src, hoverSrc, tag = '\u00A0', name = '\u00A0', price = '\u00A0' }) {

  return (
    <>
      <div className='section-collection-card swiper-slide'>
        <img src={src} alt={name} className="section-collection-card-bg" />
        <div className="hover-container opacity-wrapper">
          <div className="scale-wrapper">
            <div className='product-name'>{name}</div>
            <img src={hoverSrc} alt={name} className="card-hover-img" />
            <div className="bottom-flex-container">
              <div className='product-tag'>{tag}</div>
              <div className='product-price'>[ {price} ]</div>
            </div>
          </div>
        </div>
        <button className='product-add-button'>+</button>
      </div>
    </>
  )
}

export default CollectionCard

