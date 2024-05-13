import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
// import config from "tailwindcss/defaultConfig";
import {fetchData} from "../../../functionsConfigure/functions";
import locationData from "../../../functionsConfigure/urlsConfig";

const NewArrivals = () => {
  const [paramsReceived, setParamsReceived] = useState({});
  const [productsReceived, setProductsReceived] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    const productsAPI = `${locationData.apiUrl}products/`;
    const errormsg = "Error Fetching Products";

    fetchData(productsAPI, errormsg)
        .then(({ data }) => {
          setProductsReceived(data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
  }, [paramsReceived]);

  console.log("The products received are: ", productsReceived);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  // return (
  //   <div className="w-full pb-16">
  //     <Heading heading="New Arrivals" />
  //     <Slider {...settings}>
  //       {/*<div className="px-2">*/}
  //       {/*  {productsReceived.map((product) => (*/}
  //       {/*      <div key={product.id} item xs={12} md={6} xl={3}>*/}
  //       {/*        <Product*/}
  //       {/*            img={product.imageUrl}*/}
  //       {/*            price={product.price ? product.price : "Price not available"}*/}
  //       {/*            productName={product.name}*/}
  //       {/*            des={product.description}*/}
  //       {/*            action={{*/}
  //       {/*              type: "internal",*/}
  //       {/*              route: "/product/productpage",*/}
  //       {/*              color: "info",*/}
  //       {/*              label: "Product",*/}
  //       {/*            }}*/}
  //       {/*            authors={[{image: product.created_by_image, name: product.created_by_username}]}*/}
  //       {/*        />*/}
  //       {/*      </div>*/}
  //       {/*  ))}*/}
  //       {/*</div>*/}
  //       <div className="px-2">
  //         <Product
  //             _id="100001"
  //             img={newArrOne}
  //             productName="Round Table Clock"
  //             price="44.00"
  //             color="Black"
  //             badge={true}
  //             des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
  //         />
  //       </div>
  //       <div className="px-2">
  //         <Product
  //             _id="100002"
  //             img={newArrTwo}
  //             productName="Smart Watch"
  //             price="250.00"
  //             color="Black"
  //             badge={true}
  //             des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
  //         />
  //       </div>
  //       <div className="px-2">
  //         <Product
  //             _id="100003"
  //             img={newArrThree}
  //             productName="cloth Basket"
  //             price="80.00"
  //             color="Mixed"
  //             badge={true}
  //             des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
  //         />
  //       </div>
  //       <div className="px-2">
  //         <Product
  //             _id="100004"
  //             img={newArrFour}
  //             productName="Funny toys for babies"
  //             price="60.00"
  //             color="Mixed"
  //             badge={false}
  //             des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
  //         />
  //       </div>
  //       <div className="px-2">
  //         <Product
  //             _id="100005"
  //             img={newArrTwo}
  //             productName="Funny toys for babies"
  //             price="60.00"
  //             color="Mixed"
  //             badge={false}
  //             des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
  //         />
  //       </div>
  //     </Slider>
  //   </div>
  // );
  return (
      <div className="w-full pb-16">
        <Heading heading="New Arrivals" />
        <Slider {...settings}>
          {/*<div>*/}
          {productsReceived
              // Filter out duplicate products based on their IDs
              .filter((product, index, self) => self.findIndex(p => p.id === product.id) === index)
              .map((product) => (
                  <div key={product.id} className="px-2">
                    <Product
                        img={product.imageUrl}
                        price={product.price ? product.price : "Price not available"}
                        productName={product.name}
                        des={product.description}
                    />
                  </div>
              ))}
          {/*</div>*/}
        </Slider>
      </div>
  );

};

export default NewArrivals;
