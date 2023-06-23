import { motion, Variant } from 'framer-motion';

interface IProps {
  variants?: {
    [key: string]: Variant;
  };
}

const ClueLogo = ({ variants }: IProps) => {
  return (
    <motion.svg
      x="0px"
      y="0px"
      viewBox="0 0 200 100"
      variants={variants}
      initial="initial"
      animate="animate"
      // transition={{ duration: 7, type: 'tween', repeat: 2 }}
    >
      <g>
        <path
          d="M55.17,59.79C52.16,72.18,45.44,78,34.24,78c-15.54,0-23.59-9.45-23.59-28C10.66,32.71,19.47,22,33.61,22
		c11.41,0,18.83,6.16,20.79,17.29l-13.02,2.94c-0.7-7.7-3.36-11.13-8.47-11.13c-5.67,0-8.96,6.58-8.96,18.41
		c0,11.34,3.64,19.39,9.38,19.39c4.9,0,7.28-3.08,8.4-10.78L55.17,59.79z"
        />
        <path d="M96.35,67.49v9.8h-33.8V22.7H75.5v44.79H96.35z" />
        <path
          fill={'#FF0000'}
          className="st0"
          d="M144.65,22.7v35c0,14.06-9.1,20.3-22.04,20.3c-12.88,0-22.04-6.23-22.04-20.3v-35h12.95v34.43
		c0,8.26,3.77,11.69,9.1,11.69c5.32,0,9.1-3.43,9.1-11.69V22.7H144.65z"
        />
        <path d="M189.34,67.84v9.45h-33.46V22.7h32.82v9.45h-20.22V45.1h18.2v9.1h-18.2v13.65H189.34z" />
      </g>
    </motion.svg>
  );
};

export default ClueLogo;
