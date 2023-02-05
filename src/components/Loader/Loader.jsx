import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="gray"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ margin: '0 auto' }}
        wrapperClassName=""
        visible={true}
      />
    </>
  );
};

// import ContentLoader from 'react-content-loader';

// {
//   /* <ContentLoader
//   speed={2}
//   width={360}
//   height={260}
//   viewBox="0 0 360 260"
//   backgroundColor="#f3f3f3"
//   foregroundColor="#ecebeb"
// >
//   <rect x="0" y="0" rx="2" ry="2" width="360" height="260" />
// </ContentLoader>; */
// }
