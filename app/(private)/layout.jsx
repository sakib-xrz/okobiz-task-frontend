import AuthGuardHoc from "@/components/hoc/AuthGuardHoc";
import Navbar from "./_components/Navbar";
import Container from "@/components/shared/Container";

export default function layout({ children }) {
  return (
    <AuthGuardHoc>
      <Navbar />
      <Container>{children}</Container>
    </AuthGuardHoc>
  );
}
