export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      application_documents: {
        Row: {
          application_id: string
          created_at: string
          document_type: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
        }
        Insert: {
          application_id: string
          created_at?: string
          document_type: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          document_type?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          aadhaar_enrollment_id: string | null
          aadhaar_number: string
          address_line1: string
          address_line2: string | null
          applicant_status: string | null
          application_no: string
          area_locality: string | null
          assigned_operator_id: string | null
          city: string
          communication_address: string | null
          country: string
          country_code: string | null
          created_at: string
          declaration_date: string | null
          declaration_place: string | null
          dob: string
          email: string
          epan_url: string | null
          father_name: string
          first_name: string | null
          flat_door_block: string | null
          full_name: string
          gender: string
          has_other_name: boolean | null
          id: string
          is_locked: boolean
          is_single_parent: boolean | null
          last_name: string | null
          middle_name: string | null
          mobile: string
          mother_first_name: string | null
          mother_last_name: string | null
          mother_middle_name: string | null
          name_as_per_aadhaar: string | null
          office_area: string | null
          office_city: string | null
          office_country: string | null
          office_flat: string | null
          office_name: string | null
          office_pincode: string | null
          office_premises: string | null
          office_road: string | null
          office_state: string | null
          other_first_name: string | null
          other_last_name: string | null
          other_middle_name: string | null
          other_name_title: string | null
          pan_number: string | null
          pan_print_name: string | null
          parent_on_card: string | null
          pdf_url: string | null
          pincode: string
          premises_building: string | null
          proof_of_address: string | null
          proof_of_dob: string | null
          proof_of_identity: string | null
          road_street_lane: string | null
          selected_changes: string[] | null
          service_type: Database["public"]["Enums"]["service_type"]
          source_of_income: string[] | null
          state: string
          status: Database["public"]["Enums"]["application_status"]
          std_code: string | null
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          aadhaar_enrollment_id?: string | null
          aadhaar_number: string
          address_line1: string
          address_line2?: string | null
          applicant_status?: string | null
          application_no: string
          area_locality?: string | null
          assigned_operator_id?: string | null
          city: string
          communication_address?: string | null
          country?: string
          country_code?: string | null
          created_at?: string
          declaration_date?: string | null
          declaration_place?: string | null
          dob: string
          email: string
          epan_url?: string | null
          father_name: string
          first_name?: string | null
          flat_door_block?: string | null
          full_name: string
          gender: string
          has_other_name?: boolean | null
          id?: string
          is_locked?: boolean
          is_single_parent?: boolean | null
          last_name?: string | null
          middle_name?: string | null
          mobile: string
          mother_first_name?: string | null
          mother_last_name?: string | null
          mother_middle_name?: string | null
          name_as_per_aadhaar?: string | null
          office_area?: string | null
          office_city?: string | null
          office_country?: string | null
          office_flat?: string | null
          office_name?: string | null
          office_pincode?: string | null
          office_premises?: string | null
          office_road?: string | null
          office_state?: string | null
          other_first_name?: string | null
          other_last_name?: string | null
          other_middle_name?: string | null
          other_name_title?: string | null
          pan_number?: string | null
          pan_print_name?: string | null
          parent_on_card?: string | null
          pdf_url?: string | null
          pincode: string
          premises_building?: string | null
          proof_of_address?: string | null
          proof_of_dob?: string | null
          proof_of_identity?: string | null
          road_street_lane?: string | null
          selected_changes?: string[] | null
          service_type: Database["public"]["Enums"]["service_type"]
          source_of_income?: string[] | null
          state: string
          status?: Database["public"]["Enums"]["application_status"]
          std_code?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          aadhaar_enrollment_id?: string | null
          aadhaar_number?: string
          address_line1?: string
          address_line2?: string | null
          applicant_status?: string | null
          application_no?: string
          area_locality?: string | null
          assigned_operator_id?: string | null
          city?: string
          communication_address?: string | null
          country?: string
          country_code?: string | null
          created_at?: string
          declaration_date?: string | null
          declaration_place?: string | null
          dob?: string
          email?: string
          epan_url?: string | null
          father_name?: string
          first_name?: string | null
          flat_door_block?: string | null
          full_name?: string
          gender?: string
          has_other_name?: boolean | null
          id?: string
          is_locked?: boolean
          is_single_parent?: boolean | null
          last_name?: string | null
          middle_name?: string | null
          mobile?: string
          mother_first_name?: string | null
          mother_last_name?: string | null
          mother_middle_name?: string | null
          name_as_per_aadhaar?: string | null
          office_area?: string | null
          office_city?: string | null
          office_country?: string | null
          office_flat?: string | null
          office_name?: string | null
          office_pincode?: string | null
          office_premises?: string | null
          office_road?: string | null
          office_state?: string | null
          other_first_name?: string | null
          other_last_name?: string | null
          other_middle_name?: string | null
          other_name_title?: string | null
          pan_number?: string | null
          pan_print_name?: string | null
          parent_on_card?: string | null
          pdf_url?: string | null
          pincode?: string
          premises_building?: string | null
          proof_of_address?: string | null
          proof_of_dob?: string | null
          proof_of_identity?: string | null
          road_street_lane?: string | null
          selected_changes?: string[] | null
          service_type?: Database["public"]["Enums"]["service_type"]
          source_of_income?: string[] | null
          state?: string
          status?: Database["public"]["Enums"]["application_status"]
          std_code?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_assigned_operator_id_fkey"
            columns: ["assigned_operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          application_id: string | null
          created_at: string
          email_type: string
          id: string
          recipient_email: string
          status: string
          subject: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          email_type: string
          id?: string
          recipient_email: string
          status?: string
          subject: string
        }
        Update: {
          application_id?: string | null
          created_at?: string
          email_type?: string
          id?: string
          recipient_email?: string
          status?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      operators: {
        Row: {
          assigned_count: number
          created_at: string
          email: string
          id: string
          is_active: boolean
          name: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_count?: number
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          name: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_count?: number
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          name?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          application_id: string
          created_at: string
          currency: string
          id: string
          payment_method: string | null
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
        }
        Insert: {
          amount?: number
          application_id: string
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          application_id?: string
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      status_logs: {
        Row: {
          application_id: string
          changed_by: string | null
          created_at: string
          id: string
          new_status: string
          notes: string | null
          old_status: string | null
        }
        Insert: {
          application_id: string
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status: string
          notes?: string | null
          old_status?: string | null
        }
        Update: {
          application_id?: string
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status?: string
          notes?: string | null
          old_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "status_logs_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "operator"
      application_status:
        | "pending"
        | "paid"
        | "processing"
        | "approved"
        | "rejected"
      payment_status: "pending" | "success" | "failed" | "refunded"
      service_type:
        | "new"
        | "correction"
        | "duplicate"
        | "lost"
        | "minor-to-major"
        | "marriage"
        | "pan2"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "operator"],
      application_status: [
        "pending",
        "paid",
        "processing",
        "approved",
        "rejected",
      ],
      payment_status: ["pending", "success", "failed", "refunded"],
      service_type: [
        "new",
        "correction",
        "duplicate",
        "lost",
        "minor-to-major",
        "marriage",
        "pan2",
      ],
    },
  },
} as const
