import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="gray"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ margin: '0 auto', color: 'pink' }}
      wrapperClassName=""
      visible={true}
    />
  );
};
