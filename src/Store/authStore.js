
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


const useAuthStore = create(
    persist(
      (set) => ({
        id: null,
        email: null,
        fullName: null,
        roles: [],
        token: null,
        Status: false,
        urlPhoto: null,
        StepVerify: 0,
        Recuperarpassword: false,
        VerifyResetPassword : false,
        

        Login: (id, email, fullName, roles, token, urlPhoto) => set({
             id, 
             email, 
             fullName, 
             roles,
             token, 
             Status: true,
             urlPhoto,
             StepVerify: 0,
             Recuperarpassword: false,
             VerifyResetPassword: false
        }),
        
        Logout: () => set({
            id: null,
            email: null,
            fullName: null,
            roles: [],
            token: null,
            Status: false,
            urlPhoto: null,
            StepVerify: 0,
            Recuperarpassword: false,
            VerifyResetPassword: false
        }),
        
        firstVerify: ( email ) => set({
            StepVerify: 1,
            email
        }),
        
        changeValuePassword: ( value ) => set({
            Recuperarpassword: value
        }),
        
        changeVisibilityResetPassword: ( value ) => set({
           VerifyResetPassword: value
        }),

        updateProfileUser : ( fullName, roles, urlPhoto ) => set({
            fullName, 
            roles, 
            urlPhoto
        }),
        
      }),
  
  
      {
        name: 'DevNet-Auth-User',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
  
  export default useAuthStore;

