// Skeleton
export function makeSkeletonLoader() {
  const skeletons = document.querySelectorAll('.skeleton');
  skeletons.forEach(skeleton => {
    setTimeout(() => {
      skeleton.classList.remove('skeleton');
    }, 2000);
  });
}
