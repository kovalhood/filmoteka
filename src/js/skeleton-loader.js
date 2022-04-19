// Skeleton

export function makeSkeletonLoader() {
  const skeletons = document.querySelectorAll('.skeleton');
  console.log(skeletons);
  skeletons.forEach(skeleton => {
    console.log(skeleton);
    setTimeout(() => {
      skeleton.classList.remove('skeleton');
    }, 3000);
  });
}
