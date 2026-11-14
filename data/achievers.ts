import achieversData from './achievers.json'

const wixMedia = (file: string) => `https://static.wixstatic.com/media/${file}/v1/fit/w_1200,q_85/${file}`

// Original photo files displayed in the OUR ACHIEVERS gallery on vanchers.com.
export const achievers = achieversData.map((item, index) => ({
    ...item,
    id: `achievement-${index + 1}`,
    src: wixMedia(item.file),
    alt: item.name || `VD Vanchers achiever gallery photograph ${index + 1}`,
    number: String(index + 1).padStart(2, '0'),
}))
