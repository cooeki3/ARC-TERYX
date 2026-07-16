

function CollectionCard({ src, tag = '\u00A0', name = '\u00A0', price = '\u00A0' }) {

  return (
    <div className='section-collection-card swiper-slide'>
      <img
        src={src} alt="name"
        className="section-collection-card-bg" />
      <div className='section-collection-card-description'>
        <div className='section-collection-card-text'>
          <div className='section-collection-product-tag'>{tag}</div>
          <div className='section-collection-product-name'>{name}</div>
          <div className='section-collection-product-price'>{price}</div>
        </div>
        <button className='section-collection-product-add-button'>+</button>
      </div>
    </div>
  )
}

export default CollectionCard

