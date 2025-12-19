import axiosClient from "./axiosClient";


export const fetchProduct = async () => {
    try {
        const res = await axiosClient.get('https://search-api.jcpenney.com/v1/search-service/g/women/dresses?productGridView=medium&id=cat100210008&cm_re=ZK-_-DEPARTMENT-WOMEN-_-VN-_-CATEGORY-_-DRESSES_1&responseType=organic');
        return res.data
    } catch (error) {
        console.log('Error', error)
    }
}

export const fetchProductDetails = async (id) => {
    console.log({id})
    try {
        const res = await axiosClient.get(`https://browse-api.jcpenney.com/browse-aggregator/v2/product-summaries-aggregator?ppId=${id}`);
  return res.data;
    } catch (error) {
        console.log('Error:', error)
    }
  
};
