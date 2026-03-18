const SidebarData = [
    {
        label: "STATS",
        isMainMenu: true,
    },
    {
        label: "Dashboard",
        icon: "mdi mdi-home-variant-outline",
        url: "/dashboard",
        issubMenubadge: true,
    },
    {
        label: "Users",
        isMainMenu: true,
    },
    {
        label: "User Stats",
        icon: "mdi mdi-home-variant-outline",
        url: "/Users",
        issubMenubadge: true,
    },
    {
        label: "BRANCH-EVENTS",
        isMainMenu: true,
    },
    {
        label: "Event Catagory",
        icon: "mdi mdi-briefcase-variant-outline",
        subItem: [
            { sublabel: "View", link: "/EventCatagory" },
            { sublabel: "Update",
                subMenu: [
                    {  title : "Add", link : "/AddEventCatagory" },
                    {  title : "Edit", link : "/EditEventCatagory" },
                ]
            },
        ],
    },
    {
        label: "Event SubCatagory",
        icon: "mdi mdi-briefcase-variant-outline",
        subItem: [
            { sublabel: "View", link: "/EventSubCatagorys" },
            { sublabel: "Update", 
                subMenu: [
                    {  title : "Add", link : "/AddEventSubCatagory" },
                    {  title : "Edit", link : "/EditDepartment" },
                ]
            },
        ],
    },
    {
        label: "Events",
        icon: "ri-eraser-fill",
        subItem: [
            { sublabel: "View Events", link: "/ViewEvents" },
            { sublabel: "Update Events", 
                subMenu: [
                    {  title : "Add Events", link : "/AddEvent" },
                    {  title : "Edit Events", link : "/EditEvent" },
                ]
            },
        ],
    },
    {
        label: "COORDINATORS",
        isMainMenu: true,
    },
    {
        label: "Faculty Admins",
        icon: "mdi mdi-account-circle-outline",
        
        subItem: [
            { sublabel: "View Admins", link: "/ViewFaculty" },
            { sublabel: "Update Admins", 
                subMenu: [
                    {  title : "Add Admins", link : "/AddFaculty" },
                    {  title : "Edit Admins", link : "/EditFaculty" },
                ]
            },
        ],
    },
    {
        label: "Student Admins",
        icon: "mdi mdi-format-page-break",
        subItem: [
            { sublabel: "View Admins", link: "/ViewStudent" },
            { sublabel: "Update Admins" ,
                subMenu: [
                    {  title : "Add Admins", link : "/AddStudent" },
                    {  title : "Edit Admins", link : "/EditStudent" },
                ]
            },
        ],
    },
    
   
]
export default SidebarData;