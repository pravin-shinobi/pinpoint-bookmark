
import MyBookMarks from "./MyBookMarks";

export const metadata = {
  title: "My Bookmarks - Pinpoint",
  description: "Create, List and Manage your bookmarks here"
}

const page = async() => {

    return (
      <div>
        <MyBookMarks />
      </div>
    )
}

export default page
