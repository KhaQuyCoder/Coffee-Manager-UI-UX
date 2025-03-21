import { useEffect } from "react";

const Close = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Kiểm tra nếu người dùng nhấn nút "X" đóng trình duyệt
      if (window.performance && performance.navigation.type !== 1) {
        event.preventDefault();
        event.returnValue = "Bạn có chắc chắn muốn đóng trang?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <div>Trang của bạn có cảnh báo khi đóng trình duyệt!</div>;
};

export default Close;
