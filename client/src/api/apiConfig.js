const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '00e7c549ae2d9b1eda19d3caad272a0b',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;