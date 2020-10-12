import React from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import CategoryPaper from "./CategoryPaper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    "& .swiper-button-prev, .swiper-button-next": {
      color: theme.palette.primary.main,
      height: 22,
      width: 16,
    },
    "& .swiper-button-prev::after, .swiper-button-next::after": {
      fontSize: 30,
      [theme.breakpoints.down("sm")]: {
        fontSize: 0,
      },
    },
  },
  titleSpan: {
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  white: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  viewall: {
    float: "right",
    color: "#900325",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontWeight: 600,
    },
  },
}));

const categories = [
  {
    url: "https://www.jiomart.com/images/category/6/thumb/0-6.png",
    title: "Personal Care",
  },
  {
    url: "https://www.jiomart.com/images/category/6/thumb/0-6.png",
    title: "Personal Care",
  },
  {
    url: "https://www.jiomart.com/images/category/11/thumb/0-11.png",
    title: "Snacks and Branded Food",
  },
  {
    url: "https://www.jiomart.com/images/category/6/thumb/0-6.png",
    title: "Personal Care",
  },
  {
    url: "https://www.jiomart.com/images/category/11/thumb/0-11.png",
    title: "Snacks and Branded Food",
  },
  {
    url: "https://www.jiomart.com/images/category/6/thumb/0-6.png",
    title: "Personal Care",
  },
  {
    url: "https://www.jiomart.com/images/category/11/thumb/0-11.png",
    title: "Snacks and Branded Food",
  },
];

function CategorySwiper() {
  const classes = useStyles();
  return (
    <div className={classes.white}>
      <span className={classes.titleSpan}>Top Categories</span>
      <Button component={Link} to="/categories" className={classes.viewall}>
        View All
      </Button>
      <Swiper
        className={classes.root}
        spaceBetween={30}
        slidesPerView={5}
        breakpoints={{
          0: {
            slidesPerView: 2.3,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 4.5,
            spaceBetween: 20,
          },
          960: {
            slidesPerView: 6.5,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
          1920: {
            slidesPerView: 9,
            spaceBetween: 20,
          },
        }}
        autoHeight={true}
        navigation
      >
        {categories.map((cate, idx) => (
          <SwiperSlide key={idx}>
            <CategoryPaper title={cate.title} url={cate.url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategorySwiper;