import achieversData from './achievers.json'

// Use the original local photos supplied in public/images/gallery to avoid
// broken third-party image URLs and ensure images work in production/offline.
const localPhotoOrder = ['01', '29', '30', '19', '22', '23', '28', '32', '33', '03', '06', '15']

// Original photo files displayed in the OUR ACHIEVERS gallery on vanchers.com.
export const achievers = achieversData.map((item, index) => ({
    ...item,
    id: `achievement-${index + 1}`,
    src: `/images/gallery/gallery-${localPhotoOrder[index] ?? '01'}.jpg`,
    alt: item.name || `VD Vanchers achiever gallery photograph ${index + 1}`,
    number: String(index + 1).padStart(2, '0'),
}))
