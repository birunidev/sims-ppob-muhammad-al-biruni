export interface BannerItem {
  banner_name: string
  banner_image: string
  description: string
}

export interface ServiceItem {
  service_code: string
  service_name: string
  service_icon: string
  service_tariff: string
}

export interface BannerItems {
  banners: BannerItem[]
}

export interface ServiceItems {
  services: ServiceItem[]
}
