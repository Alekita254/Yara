const userDataString = localStorage.getItem("YaraUser");
const userData = userDataString ? JSON.parse(userDataString) : {};


export async function yaraRequestPost(url, formData) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Form submission failed");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error submitting the form data:", error);
      throw error;
    }
  }
  

  export async function yaraRequestSearch(url, formData) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData.token}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Form submission failed");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error submitting the form data:", error);
        throw error;
    }
}
